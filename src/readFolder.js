import Promise from 'promise';
import lsr from 'lsr';
import {readFile} from 'graceful-fs';
import throat from 'throat';

const rf = throat(10, Promise.denodeify(readFile));

async function readFolder(dirname) {
  const entries = await lsr(dirname);
  return Promise.all(
    entries.map(async (entry) => {
      if (entry.isFile()) {
        return {
          type: 'file',
          path: entry.path,
          content: await rf(entry.fullPath),
        };
      } else {
        return {
          type: 'directory',
          path: entry.path,
        };
      }
    }),
  );
}

export default readFolder;
