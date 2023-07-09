import { Collection } from 'discord.js';
import status from './info/status';

const commands = new Collection<string, any>();
//
const chatInputCommandInteractionCommands = new Collection<string, any>();
chatInputCommandInteractionCommands.set(status.data.name, status);
//
chatInputCommandInteractionCommands.forEach((command) => {
  commands.set(command.data.name, command);
});

export { commands, chatInputCommandInteractionCommands };
