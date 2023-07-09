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

// class DataBaseLogger implements Logger {
//   logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
//     const highlightedQuery = highlight(query);
//     logger.log({
//       level: 'info',
//       label: label,
//       message: `Query: ${highlightedQuery}`,
//     });
//   }
//   logQueryError(error: string | Error, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
//     const highlightedQuery = highlight(query);
//     logger.log({
//       level: 'error',
//       label: label,
//       message: `Error: ${error}\nQuery: ${highlightedQuery}`,
//     });
//   }
//   logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
//     // logger.warn(`Slow query: ${query}`);
//     const highlightedQuery = highlight(query);
//     logger.log({
//       level: 'warn',
//       label: label,
//       message: `Slow query (${time}ms): ${highlightedQuery}`,
//     });
//   }
//   logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
//     logger.log({
//       level: 'info',
//       label: label,
//       message: `Schema build: ${message}`,
//     });
//   }
//   logMigration(message: string, queryRunner?: QueryRunner | undefined) {
//     // logger.info(message);
//     logger.log({
//       level: 'info',
//       label: label,
//       message: `Migration: ${message}`,
//     });
//   }
//   log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner | undefined) {
//     switch (level) {
//       case 'log':
//         logger.log({
//           level: 'info',
//           label: label,
//           message: message,
//         });
//         break;
//       case 'info':
//         // logger.info(message);
//         logger.log({
//           level: 'info',
//           label: label,
//           message: message,
//         });
//         break;
//       case 'warn':
//         // logger.warn(message);
//         logger.log({
//           level: 'warn',
//           label: label,
//           message: message,
//         });
//         break;
//     }
//   }
// }

export default DataBaseLogger;
