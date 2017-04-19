import {resolve} from 'path';
import Promise from 'promise';
import rimraf from 'rimraf';
import {mkdir} from 'graceful-fs';
import chalk from 'chalk';
import throat from 'throat';
import getPackage from './getPackage';
import getPeerDependencyMatrix from './getPeerDependencyMatrix';
import readFolder from './readFolder';
import runCommand from './runCommand';
import setDependencies from './setDependencies';
import setPackage from './setPackage';
import writeFolder from './writeFolder';

const rm = Promise.denodeify(rimraf);
const mk = Promise.denodeify(mkdir);

async function runTestScript(dirname, options = {}) {
  function log(message, color) {
    if (options.log) {
      options.log((options.color && color) ? chalk[color](message) : message);
    } else {
      console.log((options.color !== false && color) ? chalk[color](message) : message);
    }
  }
  const tempdir = resolve(dirname, '../.peer-tester');
  await rm(tempdir);
  await mk(tempdir);
  const entries = await readFolder(dirname);
  const pkg = getPackage(entries);
  if (!pkg.peerDependencies) {
    throw new Error('The package.json does not specify any peer dependencies');
  }
  const matrix = await getPeerDependencyMatrix(pkg.peerDependencies);
  const suites = matrix.map(dependencies => {
    const name = Object.keys(dependencies).map(name => {
      return name + '@' + dependencies[name];
    }).join(', ');
    const key = Object.keys(dependencies).map(name => {
      return name + '_v' + dependencies[name];
    }).join('_');
    const dirname = tempdir + '/' + key + '/';
    return {name, key, dirname, dependencies};
  })
  let exitCode = 0;
  await Promise.all(
    suites.map(throat(3, async ({name, dirname, dependencies}) => {
      log('Installing ' + name);
      await mk(dirname);
      await writeFolder(
        dirname,
        setPackage(entries, setDependencies(pkg, dependencies)),
      );
      const {status, output} = await runCommand(
        'npm',
        ['install'],
        {
          cwd: dirname,
          env: {...process.env, PREVENT_PEER_TESTER_RECURSION: 'true'},
        },
      );
      if (status) {
        log('Error Installing ' + name);
        log(output.toString('utf8').trim());
        exitCode = status;
      }
    })),
  );
  if (exitCode) {
    return exitCode;
  }
  const results = await Promise.all(
    suites.map(throat(3, async ({name, dirname, dependencies}) => {
      log('Testing ' + name);
      const {status, output} = await runCommand(
        'npm',
        ['test'],
        {
          cwd: dirname,
          env: {...process.env, PREVENT_PEER_TESTER_RECURSION: 'true'},
        },
      );
      return {
        name,
        dependencies,
        status,
        output,
      };
    })),
  );

  results.forEach(result => {
    if (result.status || options.logAllResults) {
      log(
        (result.status ? '\nFailed ' : '\nSucceeded ') + result.name,
        result.status ? 'red' : 'green'
      );
      log(result.output.toString('utf8').trim());
      if (result.status) {
        exitCode = result.status;
      }
    }
  });
  await rm(tempdir);
  if (!options.logAllResults && !exitCode) {
    log('All tests passed!', 'green');
  }
  return exitCode;
}

export default runTestScript;
