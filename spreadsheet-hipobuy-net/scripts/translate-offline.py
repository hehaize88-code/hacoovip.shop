"""Fill missing dictionary entries with local Argos/OPUS models, then review.

Models are not distributed with the website. Runtime only needs checked JSON.
Usage: python scripts/translate-offline.py --models /path/to/translation-models
"""
import argparse,concurrent.futures,json,re,time
from pathlib import Path
import ctranslate2,sentencepiece

ROOT=Path(__file__).resolve().parents[1]

def translate_language(lang,models,keys):
    path=ROOT/f'app/translations/{lang}.json';dictionary=json.loads(path.read_text())
    model=next(p for p in models.iterdir() if p.is_dir() and json.loads((p/'metadata.json').read_text()).get('to_code')==lang)
    if (model/'sentencepiece.model').exists():
        tok=sentencepiece.SentencePieceProcessor(model_file=str(model/'sentencepiece.model'))
        encode=lambda s:tok.encode(s,out_type=str)
        decode=lambda tokens:''.join(tokens).replace('▁',' ').strip()
    else:
        from subword_nmt.apply_bpe import BPE
        from sacremoses import MosesTokenizer,MosesDetokenizer
        tok=BPE((model/'bpe.model').open())
        tokenizer=MosesTokenizer(lang='en');detokenizer=MosesDetokenizer(lang=lang)
        encode=lambda s:tok.process_line(tokenizer.tokenize(s,return_str=True)).split()
        decode=lambda tokens:detokenizer.detokenize(' '.join(tokens).replace('@@ ','').split())
    engine=ctranslate2.Translator(str(model/'model'),device='cpu',compute_type='int8',inter_threads=1,intra_threads=2)
    todo=[k for k in keys if k not in dictionary]
    print(f'{lang}: translating {len(todo)} entries',flush=True)
    start=time.time()
    for offset in range(0,len(todo),24):
        batch=todo[offset:offset+24];sentences=[];mapping=[]
        for text in batch:
            parts=re.split(r'(?<=[.!?])\s+(?=[A-Z0-9“‘])',text)
            mapping.append((len(sentences),len(parts)));sentences.extend(parts)
        encoded=[encode(s) for s in sentences]
        result=engine.translate_batch(encoded,beam_size=4,max_batch_size=32,max_decoding_length=512,repetition_penalty=1.05)
        translated=[decode(r.hypotheses[0]) for r in result]
        for text,(first,count) in zip(batch,mapping):
            value=' '.join(translated[first:first+count])
            value=re.sub(r'\bHip+p?o[bB]uy\b','Hipobuy',value,flags=re.I)
            dictionary[text]=value
        path.write_text(json.dumps(dictionary,ensure_ascii=False,indent=2)+'\n')
        print(f'{lang}: {min(offset+24,len(todo))}/{len(todo)} ({time.time()-start:.0f}s)',flush=True)
    return lang

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--models',type=Path,required=True);ap.add_argument('--languages',nargs='+',default=['de','es','fr','it','pl','pt','zh']);args=ap.parse_args()
    keys=json.loads((ROOT/'content/translation-keys.json').read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for result in pool.map(lambda lang:translate_language(lang,args.models,keys),args.languages):print('Complete',result,flush=True)
