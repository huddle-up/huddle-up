import { resolve, join } from 'path';

export function getConfigDirectoryPath() {
  return resolve(__dirname, '../../../../config/api');
}

export function getEnvPath(fileName: string) {
  const basePath = getConfigDirectoryPath();
  return join(basePath, fileName);
}
