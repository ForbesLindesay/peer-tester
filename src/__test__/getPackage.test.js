import getPackage from '../getPackage';
import readFolder from '../readFolder';

test('getPackage(readFolder(exampleDir))', async () => {
  const entries = await readFolder(__dirname + '/../../example');
  const pkg = getPackage(entries);
  expect(pkg).toMatchSnapshot();
});

test('getPackage([])', async () => {
  expect(() => getPackage([])).toThrow();
});
