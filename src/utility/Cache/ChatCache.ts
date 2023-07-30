import cornJob from 'node-cron';
import Cache from './Cache';
import logger from '../logging/logging';
import { discord } from '../../database/Handler';

const loggerMeta = {
  label: 'ChatCache',
};
