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
import { CreateCharacter } from './Chat/entity/Character';
import { ChatInputSlashCommand, ModalSubmitSlashCommand, SlashCommand } from './SlashCommand';
import { CreateConfig } from './Chat/Create';

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
      modalSubmitInteractionCommands.set(command.modalId, command);
      return;
    default:
      throw new Error('Invalid command type');
  }
  commands.set(command.data.name, command);
}
//
SetCommand(new status());
SetCommand(new CreateCharacter());
SetCommand(new CreateConfig());
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
