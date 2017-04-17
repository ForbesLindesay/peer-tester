module.exports = {
  test(val) {
    return Buffer.isBuffer(val);
  },
  print(val, serialize, indent) {
    return 'Buffer(' + serialize(val.toString('utf8')) + ')';
  }
};
