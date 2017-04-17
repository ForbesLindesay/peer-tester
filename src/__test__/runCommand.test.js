import runCommand from '../runCommand';

test('runCommand("echo", ["Hello World"])', async () => {
  const result = await runCommand('echo', ['Hello World']);
  expect(result.status).toEqual(0);
  expect(result.output.toString().trim()).toEqual('Hello World');
});
