import tester from './tester.js';

test('Test 1', async () =>
{
  const stats  = await tester('input.js');
  const output = stats.toJson().modules[0].source;

  console.log( "output: " + output);

  var count = (output.match(/## __spark-resource-loader__ ##/g) || []).length;

  expect(6).toBe( 6 );
});