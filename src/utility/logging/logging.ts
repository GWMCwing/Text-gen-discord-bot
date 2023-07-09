import { createLogger, format, transports } from 'winston';
import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

const consoleFormat = format.printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label || 'Main'}] [${level}]: ${message}`;
});

const removeColorCodes = format((info) => {
  if (info.message && typeof info.message === 'string') {
    info.message = info.message.replace(/\x1b\[\d+m/g, '');
  }
  return info;
});

//
//
//

const dailyRotateFileTransport_Config: DailyRotateFileTransportOptions = {
  frequency: '24h',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

const dailyRotateFileTransport_Config_JSON: DailyRotateFileTransportOptions = {
  ...dailyRotateFileTransport_Config,
  filename: 'logs/json/error/%DATE%.json.log',
  format: format.combine(
    // removeColorCodes(),
    format.uncolorize({
      level: false,
      message: true,
    }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
} as DailyRotateFileTransportOptions;

const dailyRotateFileTransport_Config_Log: DailyRotateFileTransportOptions = {
  ...dailyRotateFileTransport_Config,
  filename: 'logs/log/%DATE%.log',
  format: format.combine(
    format.uncolorize({
      level: false,
      message: true,
    }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    consoleFormat
  ),
} as DailyRotateFileTransportOptions;

//
//
//

const dailyRotateFileTransport_All_json = new DailyRotateFile({
  ...dailyRotateFileTransport_Config_JSON,
  filename: 'logs/json/%DATE%.json.log',
  level: 'verbose',
} as DailyRotateFileTransportOptions);

const dailyRotateFileTransport_Error_json = new DailyRotateFile({
  ...dailyRotateFileTransport_Config_JSON,
  filename: 'logs/json/error/%DATE%.json.log',
  level: 'error',
} as DailyRotateFileTransportOptions);

const dailyRotateFileTransport_All_log = new DailyRotateFile({
  ...dailyRotateFileTransport_Config_Log,
  filename: 'logs/log/%DATE%.log',
  level: 'verbose',
} as DailyRotateFileTransportOptions);

const dailyRotateFileTransport_Error_log = new DailyRotateFile({
  ...dailyRotateFileTransport_Config_Log,
  filename: 'logs/log/error/%DATE%.log',
  level: 'error',
} as DailyRotateFileTransportOptions);

// dailyRotateFileTransport_All.on('rotate', function (oldFilename, newFilename) {
//   // do something fun
// });

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  defaultMeta: { service: 'discord-bot' },
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(format.colorize(), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), consoleFormat),
    }),
    dailyRotateFileTransport_All_json,
    dailyRotateFileTransport_Error_json,
    dailyRotateFileTransport_All_log,
    dailyRotateFileTransport_Error_log,
  ],
});

export default logger;
