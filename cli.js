#!/usr/bin/env node

if (process.env.PREVENT_PEER_TESTER_RECURSION) {
  console.log('skipping peer-tester because:')
  console.log('  process.env.PREVENT_PEER_TESTER_RECURSION === "true"');
  process.exit(0);
}
var argv = require('yargs').argv;
var runTests = require('./lib').default;

if (argv.h || argv.help) {
  console.log('Usage:');
  console.log('');
  console.log('  peer-tester');
  console.log('');
  console.log('Args:');
  console.log('');
  console.log('  --no-color      Disable colored output');
  console.log('  --log-all-results Output the full log for successful tests as well as failed tests');
  console.log('');
  process.exit(0);
}

runTests(process.cwd(), {
  color: argv.color,
  logAllResults: argv.logAllResults,
}).then(function (exitCode) {
  process.exit(exitCode);
}, function (err) {
  setTimeout(function () {
    throw err;
  }, 0);
});
