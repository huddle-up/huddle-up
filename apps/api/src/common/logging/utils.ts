import { resolve } from 'path';

export function logPath(logName: string) {
  const envDir = process.env.HU_LOG_DIR;
  if (envDir) {
    return resolve(envDir, logName);
  }
  return resolve(__dirname, '../../../../../logs', logName);
}
