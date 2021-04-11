import get from 'lodash.get';
import { isUndefined } from '../utils';

type NoInferType<T> = [T][T extends any ? 0 : never];
type NamespaceConfig = { namespace: string; values: Record<string, any> };
type LoadNamespace = (config: Config) => NamespaceConfig;

export function createConfig(loaders: LoadNamespace[] = []): Config {
  const config = new Config();
  loaders.forEach((loader) => {
    const { namespace, values } = loader(config);
    config.load(namespace, values);
  });
  return config;
}

export class Config<K = Record<string, any>> {
  constructor(private readonly config: Record<string, any> = {}) {}

  load(namespace: string, data: K) {
    this.config[namespace] = data;
  }

  get<T = any>(propertyPath: keyof K): T | undefined;

  get<T = any>(propertyPath: keyof K, defaultValue: NoInferType<T>): T;

  get<T = any>(propertyPath: keyof K, defaultValue?: T): T | undefined {
    const value = this.getFromConfig(propertyPath);
    if (isUndefined(value) && !isUndefined(defaultValue)) {
      return defaultValue;
    }
    return value;
  }

  private getFromConfig<T = any>(propertyPath: keyof K): T | undefined {
    const value = get(this.config, propertyPath);
    return value;
  }
}
