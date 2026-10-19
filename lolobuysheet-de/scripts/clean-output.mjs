import { rmSync } from 'node:fs';
// Remove only this project's generated output so obsolete routes cannot ship.
rmSync(new URL('../dist/', import.meta.url), {recursive:true, force:true});
