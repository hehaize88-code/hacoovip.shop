"""Publish a validated static export to this site's existing Pages root only."""
import shutil,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1];out=root/'out'
subprocess.run(['python',str(root/'scripts/verify-localized.py')],check=True)
# These directories are generated routes/assets, never editable Next source.
for name in ['_next','articles','categories','faq','qc-guide','shipping','spreadsheet','404','_not-found','de','es','fr','it','pl','pt','zh']:
 target=root/name
 if target.exists():shutil.rmtree(target)
for file in root.glob('__next*.txt'):file.unlink()
for name in ['index.txt']:
 target=root/name
 if target.exists():target.unlink()
shutil.copytree(out,root,dirs_exist_ok=True)
print('Copied validated export into spreadsheet-hipobuy-net only.')
