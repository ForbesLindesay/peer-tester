function setDependencies(pkg, dependencies) {
  Object.keys(dependencies).forEach(name => {
    if (pkg.dependencies && (name in pkg.dependencies)) {
      throw new Error(
        name + ' is in both peerDependencies and dependencies. ' +
        'Peer dependencies should not be listed as dependencies.'
      );
    }
  });
  return {
    ...pkg,
    peerDependencies: dependencies,
    devDependencies: {
      ...(pkg.devDependencies || {}),
      ...dependencies,
    },
  };
}

export default setDependencies;
