import Promise from 'promise';
import rimraf from 'rimraf';
import {mkdir} from 'graceful-fs';
import readFolder from '../readFolder';
import writeFolder from '../writeFolder';

const rm = Promise.denodeify(rimraf);
const mk = Promise.denodeify(mkdir);

test('writeFolder(tempDir, readFolder(exampleDir))', async () => {
  const entries = await readFolder(__dirname + '/../../example');
  const tempDir = '.write-folder-test';
  await rm(tempDir);
  await mk(tempDir);
  await writeFolder(tempDir, entries);
  const resultingEntries = await readFolder(tempDir);
  expect(resultingEntries).toEqual(entries);
  await rm(tempDir);
});
