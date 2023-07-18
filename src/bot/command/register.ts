import { config as env } from 'dotenv';
env();
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { commands } from './commandList';
import logger from '../../utility/logging/logging';

const commandData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

commands.forEach((command) => {
  commandData.push(command.data.toJSON());
});

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

(async () => {
  try {
    logger.info('Started refreshing application (/) commands.');
    const data: any = await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID as string), { body: commandData });
    logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (err) {
    logger.error(err);
  }
})();
