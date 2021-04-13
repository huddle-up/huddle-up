import { Config, createConfig } from './config';

test('it loads the values into the correct namespace', () => {
  const config = new Config();

  config.load('test', {
    hello: 'world',
  });

  expect(config.get('test.hello')).toBe('world');
});

test('it overwrites an existing config', () => {
  const config = new Config();

  config.load('test', {
    before: 'test',
  });
  config.load('test', {
    after: 'no before',
  });

  expect(config.get('test.before')).toBeUndefined();
  expect(config.get('test.after')).toBe('no before');
});

test('it returns undefined if no value is found', () => {
  const config = new Config();

  expect(config.get('test.hello')).toBeUndefined();
});

test('it returns a default value if no value is found', () => {
  const config = new Config();
  expect(config.get('test.hello', 'world')).toBe('world');
});

test('it creates a config from given loaders', () => {
  const config = createConfig([
    () => ({ namespace: 'test', values: { hello: 'world' } }),
    () => ({ namespace: 'test2', values: { hello: 'again' } }),
  ]);

  expect(config.get('test.hello')).toBe('world');
  expect(config.get('test2.hello')).toBe('again');
});

test('it passes the current config to loaders', () => {
  const config = createConfig([
    () => ({ namespace: 'test', values: { hello: 'world' } }),
    (cfg) => ({ namespace: 'test2', values: { hello: cfg.get('test.hello') } }),
  ]);

  expect(config.get('test2.hello')).toBe('world');
});

test('it calls the loaders in the same order as provided', () => {
  const config = createConfig([
    (cfg) => ({ namespace: 'test', values: { hello: cfg.get('test2.hello'), world: 'world' } }),
    (cfg) => ({ namespace: 'test2', values: { hello: cfg.get('test.world') } }),
  ]);

  expect(config.get('test.hello')).toBeUndefined();
  expect(config.get('test2.hello')).toBe('world');
});
