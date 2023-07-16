import { Client, Events } from 'discord.js';
import { config as env } from 'dotenv';
env();
//
import db from './database/typeorm_old/Database';
import Bot from './bot/Bot';
import logger from './utility/logging/logging';

(async () => {
  logger.info('Setting up database...');
  await db.connect();
  logger.info('Database is ready.');
  // reload config
  const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessageTyping', 'GuildMessages', 'MessageContent'],
  });

  await new Bot(client).start();
})();
