import {inspect} from 'util';
import {satisfies} from 'semver';
import RegClient from 'npm-registry-client';

const client = new RegClient({});

const params = {timeout: 1000};

function getVersions(name, range) {
  return new Promise((resolve, reject) => {
    if (typeof name !== 'string') {
      throw new Error('Expected name to be a string but got ' + inspect(name));
    }
    client.get('https://registry.npmjs.org/' + name, params, function (err, data, raw, res) {
      if (err) return reject(err);
      const versions = Object.keys(data.versions || {});
      const satisfyingVersions = versions.filter(version => satisfies(version, range));
      resolve(satisfyingVersions);
    });
  });
}

export default getVersions;
