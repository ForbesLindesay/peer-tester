import getVersions from './getVersions';

async function getPeerDependencyMatrix(dependencies) {
  const versions = await Promise.all(
    Object.keys(dependencies).sort().map(async (name) => {
      return [name, await getVersions(name, dependencies[name])];
    }),
  );
  return toMatrix(versions);
}

function toMatrix(list) {
  if (list.length === 0) {
    return [{}];
  }
  const [name, versions] = list[0];
  const result = [];
  for (const child of toMatrix(list.slice(1))) {
    for (const version of versions) {
      result.push({...child, [name]: version});
    }
  }
  return result;
}

export default getPeerDependencyMatrix;
