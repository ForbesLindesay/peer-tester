import runTestScript from '../';

test('logAllResults: true', async () => {
  let output = '';
  const result = await runTestScript(__dirname + '/../../example', {
    log: message => output += message + '\n',
    logAllResults: true,
  });
  expect(output).toMatchSnapshot();
  expect(result).toBe(1);
});

test('logAllResults: false', async () => {
  let output = '';
  const result = await runTestScript(__dirname + '/../../example', {
    log: message => output += message + '\n',
  });
  expect(output).toMatchSnapshot();
  expect(result).toBe(1);
});

test('logAllResults: false, color: true', async () => {
  let output = '';
  const result = await runTestScript(__dirname + '/../../example', {
    log: message => output += message + '\n',
    color: true,
  });
  expect(output).toMatchSnapshot();
  expect(result).toBe(1);
});
