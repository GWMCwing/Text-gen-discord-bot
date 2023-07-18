import { Client, Events } from 'discord.js';
import { config as env } from 'dotenv';
env();
//
import { discord, discord_chat } from './database/Handler';
import Bot from './bot/Bot';
import logger from './utility/logging/logging';

(async () => {
  logger.info('Setting up database...');
  await discord_chat.from('discord_chat:chat').select('*').eq('id', '1');
  logger.info('Database is ready.');
  // reload config
  const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessageTyping', 'GuildMessages', 'MessageContent'],
  });

  await new Bot(client).start();
})();
