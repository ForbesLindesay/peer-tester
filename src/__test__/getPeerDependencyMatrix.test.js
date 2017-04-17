import getPeerDependencyMatrix from '../getPeerDependencyMatrix';

test('getPeerDependencyMatrix({"promise": "^6.0.0", "then-request": "^1.0.0"})', async () => {
  const matrix = await getPeerDependencyMatrix({"promise": "^6.0.0", "then-request": "^1.0.0"});
  expect(matrix).toMatchSnapshot();
});
