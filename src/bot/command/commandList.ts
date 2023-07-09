import {
  AnySelectMenuInteraction,
  AutocompleteInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Collection,
  Interaction,
  MessageContextMenuCommandInteraction,
  ModalSubmitInteraction,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import status from './info/status';
import SlashCommand from './SlashCommand';

const commands = new Collection<string, SlashCommand<any>>();
//
const chatInputCommandInteractionCommands = new Collection<string, SlashCommand<ChatInputCommandInteraction>>();
const messageContextMenuCommandInteractionCommands = new Collection<string, SlashCommand<MessageContextMenuCommandInteraction>>();
const userContextMenuCommandInteractionCommands = new Collection<string, SlashCommand<UserContextMenuCommandInteraction>>();
const anySelectMenuInteractionCommands = new Collection<string, SlashCommand<AnySelectMenuInteraction>>();
const buttonInteractionCommands = new Collection<string, SlashCommand<ButtonInteraction>>();
const autocompleteInteractionCommands = new Collection<string, SlashCommand<AutocompleteInteraction>>();
const modalSubmitInteractionCommands = new Collection<string, SlashCommand<ModalSubmitInteraction>>();
//
//
function SetCommand(command: SlashCommand<Interaction>) {
  commands.set(command.data.name, command);
  switch (command.type) {
    case 'ChatInput':
      chatInputCommandInteractionCommands.set(command.data.name, command);
      break;
    case 'MessageContext':
      messageContextMenuCommandInteractionCommands.set(command.data.name, command);
      break;
    case 'UserContext':
      userContextMenuCommandInteractionCommands.set(command.data.name, command);
      break;
    case 'AnySelectMenu':
      anySelectMenuInteractionCommands.set(command.data.name, command);
      break;
    case 'Button':
      buttonInteractionCommands.set(command.data.name, command);
      break;
    case 'Autocomplete':
      autocompleteInteractionCommands.set(command.data.name, command);
      break;
    case 'ModalSubmit':
      modalSubmitInteractionCommands.set(command.data.name, command);
      break;
    default:
      throw new Error('Invalid command type');
  }
}
//
SetCommand(status);
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
