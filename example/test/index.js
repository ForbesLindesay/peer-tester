console.log('promise version v' + require('promise/package.json').version);
if (require('promise/package.json').version === '6.0.1') {
  console.log('Simulating faield test for v6.0.1');
  process.exit(1);
}
