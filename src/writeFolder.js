import {resolve} from 'path';
import lsr from 'lsr';
import {writeFile, mkdir} from 'then-fs';

async function writeFolder(dirname, entries) {
  for (const entry of entries) {
    if (entry.type === 'file') {
      await writeFile(resolve(dirname, entry.path), entry.content);
    } else {
      await mkdir(resolve(dirname, entry.path));
    }
  }
}

export default writeFolder;
