import { ChatInputCommandInteraction, Interaction, ModalBuilder, ModalSubmitInteraction, SlashCommandBuilder } from 'discord.js';

abstract class _SlashCommand<T extends Interaction> {
  abstract readonly type: 'ChatInput' | 'MessageContext' | 'UserContext' | 'AnySelectMenu' | 'Button' | 'Autocomplete' | 'ModalSubmit';
  public abstract data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  public abstract execute(interaction: T, ...args: any[]): Promise<void>;
}

abstract class ChatInputSlashCommand extends _SlashCommand<ChatInputCommandInteraction> {
  readonly type = 'ChatInput';
}

abstract class ModalSubmitSlashCommand extends _SlashCommand<ModalSubmitInteraction> {
  readonly type = 'ModalSubmit';
  abstract readonly modalId: string;
  data = null as any;
  public abstract getModal(...args: any[]): ModalBuilder;
}

type SlashCommand = ChatInputSlashCommand | ModalSubmitSlashCommand;

export { ChatInputSlashCommand, ModalSubmitSlashCommand };
export type { SlashCommand };
