import setPackage from '../setPackage';
import readFolder from '../readFolder';

test('setPackage(readFolder(exampleDir), {"hello": "world"})', async () => {
  const entries = await readFolder(__dirname + '/../../example');
  const entriesWithPkg = setPackage(entries, {"hello": "world"});
  expect(entriesWithPkg).toMatchSnapshot();
});
