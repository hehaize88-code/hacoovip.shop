"""Export only public documents and assets, never source or editorial data."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
output=root/'dist/pages'
if output.exists():shutil.rmtree(output)
output.mkdir(parents=True)
excluded={'app','scripts','tests','templates','content','node_modules','dist','build','worker','public'}
suffixes={'.html','.css','.js','.svg','.png','.jpg','.jpeg','.webp','.avif','.woff','.woff2','.ico','.xml','.txt'}
for path in root.rglob('*'):
 if not path.is_file():continue
 relative=path.relative_to(root)
 if any(x in excluded or x.startswith('.') for x in relative.parts):continue
 if path.name=='requirements-maintenance.txt':continue
 if path.suffix not in suffixes and path.name not in {'_redirects','_headers'}:continue
 dest=output/relative;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(path,dest)
print('Prepared verified static artifact in dist/pages.')
