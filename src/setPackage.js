function setPackage(entries, pkg) {
  return entries.map(entry => {
    if (entry.path === './package.json') {
      return {
        ...entry,
        content: new Buffer(JSON.stringify(pkg, null, '  ')),
      };
    }
    return entry;
  })
}
export default setPackage;
