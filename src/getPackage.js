function getPackage(entries) {
  for (const entry of entries) {
    if (entry.path === './package.json') {
      try {
        return JSON.parse(entry.content.toString());
      } catch (ex) {
        throw new Error('Syntax error while parsing package.json\n' + ex.message);
      }
    }
  }
  throw new Error('Could not find package.json');
}
export default getPackage;
