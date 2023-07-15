import { Collection } from 'discord.js';
import status from './info/status';
import { CreateCharacter } from './chat/entity/character/Create';
import { ChatInputSlashCommand, ModalSubmitSlashCommand, SlashCommand } from './SlashCommand';
import { CreateConfig } from './chat/config/Create';
import logger from '../../utility/logging/logging';

const commands = new Collection<string, SlashCommand>();
//
const chatInputCommandInteractionCommands = new Collection<string, ChatInputSlashCommand>();
const messageContextMenuCommandInteractionCommands = new Collection<string, SlashCommand>();
const userContextMenuCommandInteractionCommands = new Collection<string, SlashCommand>();
const anySelectMenuInteractionCommands = new Collection<string, SlashCommand>();
const buttonInteractionCommands = new Collection<string, SlashCommand>();
const autocompleteInteractionCommands = new Collection<string, SlashCommand>();
const modalSubmitInteractionCommands = new Collection<string, ModalSubmitSlashCommand>();
//
//
function SetCommand(command: SlashCommand) {
  // early return if the slash command does not require a data
  switch (command.type) {
    case 'ChatInput':
      if (chatInputCommandInteractionCommands.has(command.data.name)) throw new Error(`Duplicate ChatInputSlashCommand: ${command.data.name}`);
      chatInputCommandInteractionCommands.set(command.data.name, command);
      break;
    // case 'MessageContext':
    //   messageContextMenuCommandInteractionCommands.set(command.data.name, command);
    //   break;
    // case 'UserContext':
    //   userContextMenuCommandInteractionCommands.set(command.data.name, command);
    //   break;
    // case 'AnySelectMenu':
    //   anySelectMenuInteractionCommands.set(command.data.name, command);
    //   break;
    // case 'Button':
    //   buttonInteractionCommands.set(command.data.name, command);
    //   break;
    // case 'Autocomplete':
    //   autocompleteInteractionCommands.set(command.data.name, command);
    //   break;
    case 'ModalSubmit':
      if (modalSubmitInteractionCommands.has(command.modalId)) throw new Error(`Duplicate modalId: ${command.modalId}`);
      modalSubmitInteractionCommands.set(command.modalId, command);
      return;
    default:
      throw new Error('Invalid command type');
  }
  commands.set(command.data.name, command);
}
//
logger.info('Registering commands');
SetCommand(new status());
SetCommand(new CreateCharacter());
SetCommand(new CreateConfig());

logger.info(
  `Registered:\n
Command:
${commands.map((command) => `- ${command.data.name}`).join('\n')}
ChatInputSlashCommand:
${chatInputCommandInteractionCommands.size === 0 ? '- None' : chatInputCommandInteractionCommands.map((command) => `- ${command.data.name}`).join('\n')}
MessageContextMenuSlashCommand:
${messageContextMenuCommandInteractionCommands.size === 0 ? '- None' : messageContextMenuCommandInteractionCommands.map((command) => command.data.toJSON()).join('\n')}
UserContextMenuSlashCommand:
${userContextMenuCommandInteractionCommands.size === 0 ? '- None' : userContextMenuCommandInteractionCommands.map((command) => command.data.toJSON()).join('\n')}
AnySelectMenuSlashCommand:
${anySelectMenuInteractionCommands.size === 0 ? '- None' : anySelectMenuInteractionCommands.map((command) => command.data.toJSON()).join('\n')}
ButtonSlashCommand:
${buttonInteractionCommands.size === 0 ? '- None' : buttonInteractionCommands.map((command) => command.data.toJSON()).join('\n')}
AutocompleteSlashCommand:
${autocompleteInteractionCommands.size === 0 ? '- None' : autocompleteInteractionCommands.map((command) => command.data.toJSON()).join('\n')}
ModalSubmitSlashCommand:
${modalSubmitInteractionCommands.size === 0 ? '- None' : modalSubmitInteractionCommands.map((command) => `- ${command.modalId}`).join('\n')}
`
);

logger.info('Finished registering commands');
//
export {
  commands,
  chatInputCommandInteractionCommands,
  messageContextMenuCommandInteractionCommands,
  userContextMenuCommandInteractionCommands,
  anySelectMenuInteractionCommands,
  buttonInteractionCommands,
  autocompleteInteractionCommands,
  modalSubmitInteractionCommands,
};
