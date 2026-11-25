"""Build complete locale files offline on the public repository's standard runners."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess

MULTILINGUAL = ('jncraton/m2m100_1.2B-ct2-int8','e50078df6be13a88592b70ea42f4d74c2082e448')
PAIR_MODELS = {
 'de': ('michaelfeil/ct2fast-opus-mt-en-de','8ccfcb72178a843301fab5a288dee687e0aa1afc'),
 'fr': ('michaelfeil/ct2fast-opus-mt-en-fr','55bcef18761227161433d86b81bbbcd9d813b429'),
 'es': ('michaelfeil/ct2fast-opus-mt-en-es','76ec296588e2234f9b7dfad5254219a0f5ecb7af'),
}
def read(path):
 return json.loads(path.read_text())
def write(path,data):
 path.parent.mkdir(parents=True,exist_ok=True)
 path.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n')
def fields(data):
 articles=data['articles']
 result={'articles':[s for a in articles for s in (a['title'],a['description'])],
         'faq':[s for q in data['faq'] for s in (q['q'],q['a'])]}
 for a in articles:
  result[a['slug']]=[a['title'],a['description'],*[t for s in a['sections'] for t in [s['heading'],*s['paragraphs']]]]
 return result
def model(lang):
 import ctranslate2
 import sentencepiece as spm
 repo,rev=PAIR_MODELS.get(lang,MULTILINGUAL)
 folder=Path(os.environ.get('RUNNER_TEMP','/tmp'))/('editorial-'+repo.rsplit('/',1)[1])
 folder.mkdir(exist_ok=True)
 base=f'https://huggingface.co/{repo}/resolve/{rev}/'
 # Only data files are loaded. The revision is immutable and no repository code runs.
 files=['model.bin','config.json']+(['source.spm','target.spm','shared_vocabulary.txt'] if lang in PAIR_MODELS else ['sentencepiece.bpe.model','shared_vocabulary.json'])
 for name in files:
  f=folder/name
  if not f.exists():
   subprocess.run(['curl','--fail','--location','--retry','3','--max-time','400','--silent','--show-error',base+name,'-o',str(f)+'.tmp'],check=True)
   Path(str(f)+'.tmp').replace(f)
 tr=ctranslate2.Translator(str(folder),device='cpu',compute_type='int8',intra_threads=min(8,os.cpu_count() or 2))
 def tok(name):return spm.SentencePieceProcessor(model_file=str(folder/name))
 enc=tok('source.spm' if lang in PAIR_MODELS else 'sentencepiece.bpe.model')
 dec=tok('target.spm') if lang in PAIR_MODELS else enc
 return tr,enc,dec
def translate(lang):
 tr,enc,dec=model(lang); paired=lang in PAIR_MODELS
 for config in sorted(Path('.').glob('*/editorial-config.json')):
  cfg=read(config);dest='zh' if lang=='zh-CN' and 'zh' in cfg['languages'] else lang
  if dest not in cfg['languages']:continue
  source=config.parent/'editorial-content.json';pages=fields(read(source))
  # Reuse translated titles/descriptions verbatim between the index and article.
  strings=list(dict.fromkeys(line for page in pages.values() for line in page))
  chunks=[];mapping=[]
  for line in strings:
   sentences=re.split(r'(?<=[.!?])\s+(?=[A-Z0-9“"])',line)
   # Short sentences stay together to retain context; cap block size in tokens.
   blocks=[];parts=[]
   for sentence in sentences:
    if parts and len(enc.encode(' '.join(parts+[sentence])))>100:
     blocks.append(' '.join(parts));parts=[]
    parts.append(sentence)
   if parts:blocks.append(' '.join(parts))
   mapping.append(len(blocks));chunks.extend(blocks)
  target='zh' if lang=='zh-CN' else lang
  inputs=[([] if paired else ['__en__'])+enc.encode(line,out_type=str)+['</s>'] for line in chunks]
  opts={} if paired else {'target_prefix':[['__'+target+'__']]*len(inputs)}
  results=tr.translate_batch(inputs,beam_size=2,max_batch_size=900,batch_type='tokens',max_decoding_length=350,repetition_penalty=1.03,**opts)
  translated=[]
  for res in results:
   tokens=res.hypotheses[0] if paired else res.hypotheses[0][1:]
   text=dec.decode(tokens).strip()
   if not text:raise ValueError('Empty translated field')
   translated.append(text)
  index=0;lookup={}
  for line,length in zip(strings,mapping):
   lookup[line]=' '.join(translated[index:index+length]);index+=length
  output={key:[lookup[line] for line in lines] for key,lines in pages.items()}
  write(Path('localized-output')/config.parent.name/(dest+'.json'),{'source':hashlib.sha256(source.read_bytes()).hexdigest(),'data':output})
  print(config.parent.name,dest,len(strings),'fields',flush=True)
def clean_names(text,brand):
 # These compounds are observed machine translations of protected brand names.
 # Keep ordinary words and grammatical suffixes outside the name intact.
 if brand.lower().endswith('buy'):
  stem=re.escape(brand[:-3])
  pattern=r"(?<![A-Za-z0-9])"+stem+r"[ -]?(?:AcheterLe|Acheter|Achetez|Comprar|Compra|Compre|Kaufen)(?![A-Za-z])"
  text=re.sub(pattern,brand,text,flags=re.IGNORECASE)
 if brand=='BBDBuy':
  text=re.sub(r"(?<![A-Za-z])(?:BBDAy|BBDDuy|BBDDAuy|BBDDBuy)(?![A-Za-z])",brand,text,flags=re.IGNORECASE)
 return re.sub(r"(?<![A-Za-z])Weidien(?![A-Za-z])","Weidian",text,flags=re.IGNORECASE)
def reviewed_chinese(folder,source_hash):
 path=Path('shopping-editorial/reviewed-zh')/(folder+'.json')
 if path.exists():
  review=read(path)
 else:
  # The publication job checks out just the content inputs. Read the matching
  # revision of the editorial review when it is outside that sparse checkout.
  obj=subprocess.run(['git','show','HEAD:'+path.as_posix()],capture_output=True)
  if obj.returncode:return None
  review=json.loads(obj.stdout)
 return review['data'] if review['source']==source_hash else None
def assemble():
 for config in sorted(Path('.').glob('*/editorial-config.json')):
  source=config.parent/'editorial-content.json';pages=fields(read(source));signature=hashlib.sha256(source.read_bytes()).hexdigest()
  result={}
  settings=read(config)
  articles=read(source)['articles']
  for lang in settings['languages']:
   if lang=='en':continue
   obj=read(Path('localized-output')/config.parent.name/(lang+'.json'))
   if obj['source']!=signature:raise ValueError('Source changed during translation')
   translated=obj['data']
   if lang in ('zh','zh-CN'):
    translated=reviewed_chinese(config.parent.name,signature) or translated
   if translated.keys()!=pages.keys() or any(len(ls)!=len(pages[k]) or not all(isinstance(s,str) and s.strip() for s in ls) for k,ls in translated.items()):raise ValueError('Incomplete '+lang)
   translated={key:[clean_names(line,settings['brand']) for line in value] for key,value in translated.items()}
   titles=settings.get('localizedTitles',{}).get(lang,{})
   for index,article in enumerate(articles):
    if article['slug'] in titles:
     title=titles[article['slug']]
     translated[article['slug']][0]=title
     translated['articles'][2*index]=title
   checked_faq=settings.get('localizedFaq',{}).get(lang)
   if checked_faq:
    if len(checked_faq)!=len(pages['faq']):raise ValueError('Incomplete reviewed FAQ')
    translated['faq']=checked_faq
   result[lang]=translated
  write(config.parent/'editorial-locales.json',result)
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('operation',choices=['translate','assemble']);parser.add_argument('--lang');args=parser.parse_args()
 if args.operation=='translate':translate(args.lang)
 else:assemble()
