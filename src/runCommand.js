import spawn from 'cross-spawn';

function runCommand(name, args, opts) {
  return new Promise((resolve, reject) => {
    let output = [];
    const child = spawn(name, args, {...opts, stdio: 'pipe'});
    child.stdout.on('data', data => output.push(data));
    child.stderr.on('data', data => output.push(data));
    child.on('exit', status => {
      resolve({status, output: Buffer.concat(output)});
    });
    child.on('error', err => {
      reject(new Error('Error running ' + name + ': ' + err.message));
    });
  });
}

export default runCommand;
