import {resolve} from 'path';
import Promise from 'promise';
import lsr from 'lsr';
import {writeFile, mkdir} from 'graceful-fs';

const wf = Promise.denodeify(writeFile);
const mkd = Promise.denodeify(mkdir);

async function writeFolder(dirname, entries) {
  for (const entry of entries) {
    if (entry.type === 'file') {
      await wf(resolve(dirname, entry.path), entry.content);
    } else {
      await mkd(resolve(dirname, entry.path));
    }
  }
}

export default writeFolder;
