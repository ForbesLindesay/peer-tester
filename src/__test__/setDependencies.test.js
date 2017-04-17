import setDependencies from '../setDependencies';

test('setDependencies({"peerDependencies": {"react": "^0.14.0"}, "devDependencies": {"react": "^0.14.0"}}, {"react": "0.14.0"})', async () => {
  const dependecies = setDependencies(
    {"peerDependencies": {"react": "^0.14.0"}, "devDependencies": {"react": "^0.14.0"}},
    {"react": "0.14.0"},
  );
  expect(dependecies).toMatchSnapshot();
});
test('setDependencies({"dependencies": {"react": "^0.14.0"}}, {"react": "0.14.0"})', async () => {
  expect(() => setDependencies(
    {"dependencies": {"react": "^0.14.0"}},
    {"react": "0.14.0"},
  )).toThrow();
});
