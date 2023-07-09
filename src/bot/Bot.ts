import { Client, Events } from 'discord.js';
import CommandHandler from './handler/CommandHandler';
import ChatHandler from './handler/Chathandler';
import logger from '../utility/logging/logging';

class Bot {
  private client: Client;
  private commandHandler: CommandHandler;
  private chatHandler: ChatHandler;
  constructor(client: Client) {
    this.client = client;
    this.commandHandler = new CommandHandler(client);
    this.chatHandler = new ChatHandler(client);
  }
  public async start() {
    logger.info('Setting up bot...');
    await this.onStart();
    logger.info('Starting command handler...');
    await this.commandHandler.start();
    logger.info('Started command handler.');
    logger.info('Starting chat handler...');
    await this.chatHandler.start();
    logger.info('Started chat handler.');
    await this.logIn();
    logger.info('Bot is ready.');
  }
  private async onStart() {
    this.client.once(Events.ClientReady, (c) => {
      logger.info(`Logged in as ${c.user?.tag}`);
    });
  }
  private async logIn() {
    this.client.login(process.env.DISCORD_TOKEN);
  }
}

export default Bot;
