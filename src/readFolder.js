import lsr from 'lsr';
import {readFile} from 'then-fs';

async function readFolder(dirname) {
  const entries = await lsr(dirname);
  return Promise.all(
    entries.map(async (entry) => {
      if (entry.isFile()) {
        return {
          type: 'file',
          path: entry.path,
          content: await readFile(entry.fullPath),
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
