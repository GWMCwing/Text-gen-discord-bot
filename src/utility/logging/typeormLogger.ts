import { AbstractLogger, Logger, LogLevel, LogMessage, QueryRunner } from 'typeorm';
import logger from './logging';
import chalk from 'chalk';

const label = 'Database';

class DataBaseLogger extends AbstractLogger {
  protected writeLog(level: LogLevel, logMessage: LogMessage | LogMessage[], queryRunner?: QueryRunner) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: true,
    });

    for (let message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          logger.log({ level: 'info', label: label, message: chalk.underline(String(message.message)) });
          break;

        case 'info':
        case 'query':
          if (message.prefix) {
            // logger.log(message.prefix, message.message);
            logger.log({ level: 'info', label: label, message: `${chalk.gray.underline(message.prefix)} ${String(message.message)}` });
          } else {
            logger.log({ level: 'info', label: label, message: chalk.underline(String(message.message)) });
          }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            // logger.log(message.prefix, message.message);
            logger.log({ level: 'warn', label: label, message: `${chalk.underline.yellow(message.prefix)} ${String(message.message)}` });
          } else {
            console.warn(logger.log({ level: 'warn', label: label, message: String(message.message) }));
          }
          break;

        case 'error':
        case 'query-error':
          if (message.prefix) {
            // logger.log(message.prefix, { level: 'error', label: label, message: String(message.message) });
            logger.log({ level: 'error', label: label, message: `${chalk.underline.red(message.prefix)} ${String(message.message)}` });
          } else {
            console.error(logger.log({ level: 'error', label: label, message: String(message.message) }));
          }
          break;
      }
    }
  }
}

export default DataBaseLogger;
