import {sync as rimraf} from 'rimraf';
import {mkdir} from 'then-fs';
import readFolder from '../readFolder';
import writeFolder from '../writeFolder';

test('writeFolder(tempDir, readFolder(exampleDir))', async () => {
  const entries = await readFolder(__dirname + '/../../example');
  const tempDir = '.write-folder-test';
  rimraf(tempDir);
  await mkdir(tempDir);
  await writeFolder(tempDir, entries);
  const resultingEntries = await readFolder(tempDir);
  expect(resultingEntries).toEqual(entries);
  rimraf(tempDir);
});
