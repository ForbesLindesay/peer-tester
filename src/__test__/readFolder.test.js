import readFolder from '../readFolder';

test('readFolder(exampleDir)', async () => {
  const files = await readFolder(__dirname + '/../../example');
  expect(files).toMatchSnapshot();
});
