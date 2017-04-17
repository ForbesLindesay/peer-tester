# peer-tester

Test a project with every valid peer dependency.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/peer-tester/master.svg)](https://travis-ci.org/ForbesLindesay/peer-tester)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/peer-tester/master.svg)](http://david-dm.org/ForbesLindesay/peer-tester)
[![NPM version](https://img.shields.io/npm/v/peer-tester.svg)](https://www.npmjs.org/package/peer-tester)

## Installation

```
npm install peer-tester --save
```

## Usage

Add `& peer-tester` to your `npm test` script, e.g.

```json
{
  "peerDependencies": {
    "react": "*"
  },
  "devDependencies": {
    "jest": "*",
    "peer-tester": "*",
    "react": "*"
  },
  "scripts": {
    "test": "jest && peer-tester"
  }
}
```

This will first run your tests for the currently installed configuration, then run your tests again for each version of "react" that matches "*".

To see options, run `peer-tester --help`.

## License

MIT
