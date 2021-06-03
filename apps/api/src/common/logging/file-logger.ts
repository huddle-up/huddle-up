import { Logger } from '@nestjs/common';
import * as logger from 'winston';

export class FileLogger extends Logger {
  constructor(context?: string, isTimestampEnabled?: boolean) {
    const { combine, timestamp, printf, errors } = logger.format;

    logger.configure({
      level: 'info',
      format: combine(
        errors({ stack: true }),
        timestamp(),
        printf((msg) => {
          if (msg.trace) {
            return `${msg.timestamp} [${msg.level}] ${msg.message} : ${msg.trace}`;
          }
          return `${msg.timestamp} [${msg.level}] ${msg.message}`;
        })
      ),
      defaultMeta: { service: 'HuddleUp' },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new logger.transports.File({ filename: 'error.log', level: 'error' }),
        new logger.transports.File({ filename: 'combined.log' }),
      ],
    });
    super(context, isTimestampEnabled);
  }

  log(message: string) {
    logger.info(message);
    super.log(message);
  }

  error(message: string, trace: string) {
    logger.error(message, trace);
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
