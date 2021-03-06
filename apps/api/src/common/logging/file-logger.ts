import { Logger } from '@nestjs/common';
import * as logger from 'winston';
import { logPath } from './utils';

export class FileLogger extends Logger {
  constructor(context?: string, isTimestampEnabled?: boolean) {
    const { combine, timestamp, printf, errors } = logger.format;

    logger.configure({
      level: 'info',
      format: combine(
        errors({ stack: true }),
        timestamp(),
        printf((msg) => {
          const mainMessage = `${msg.timestamp} [${msg.level}] ${msg.service} - ${msg.message}`;
          if (msg.trace) {
            return `${mainMessage} : ${msg.trace}`;
          }
          return mainMessage;
        })
      ),
      defaultMeta: { service: 'HuddleUp' },
      transports: [
        // - Write all logs with level `error` and below to `error.log`
        new logger.transports.File({ filename: logPath('error.log'), level: 'error' }),
        // - Write all logs with level `info` and below to `combined.log`
        // new logger.transports.File({ filename: logPath('combined.log') }),
      ],
    });
    super(context, isTimestampEnabled);
  }

  log(message: string) {
    logger.info(message);
    super.log(message);
  }

  error(message: string, trace: string) {
    logger.error(message, { trace });
    super.error(message, trace);
  }

  warn(message: string) {
    logger.warn(message);
    super.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
    super.debug(message);
  }

  verbose(message: string) {
    logger.verbose(message);
    super.verbose(message);
  }
}
