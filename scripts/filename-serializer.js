module.exports = {
  test(val) {
    return (
      typeof val === 'string' &&
      (
        val.indexOf('\\') !== -1 ||
        val.indexOf(process.cwd().replace(/\\/g, '/')) !== -1
      )
    );
  },
  print(val, serialize, indent) {
    return serialize(
      val.replace(/\\/g, '/').split(process.cwd().replace(/\\/g, '/')).join('<cwd>')
    );
  }
};
