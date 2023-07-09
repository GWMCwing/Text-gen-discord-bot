import { Client, Events } from 'discord.js';
import { config as env } from 'dotenv';
env();
//
import db from './database/Database';
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

  // client.once(Events.ClientReady, (c) => {
  //   console.log(`Logged in as ${c.user?.tag}`);
  // });

  // client.on(Events.MessageCreate, (message) => {
  //   if (message.content === 'ping') {
  //     message.reply({
  //       content: 'pong',
  //       allowedMentions: { repliedUser: false },
  //     });
  //   } else if (message.content === 'hello') {
  //     // react ban emoji
  //     message.react('⛔');
  //   }
  // });
  // new CommandHandler(client).start();

  // client.login(process.env.DISCORD_TOKEN);
})();
