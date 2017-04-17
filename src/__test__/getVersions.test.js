import getVersions from '../getVersions';

test('getVersions("react", "^0.14.0")', async () => {
  const versions = await getVersions('react', '^0.14.0');
  expect(versions).toMatchSnapshot();
});
