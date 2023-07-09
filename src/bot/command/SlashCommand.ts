import { Interaction, SlashCommandBuilder } from 'discord.js';

abstract class SlashCommand<T extends Interaction> {
  public abstract type: 'ChatInput' | 'MessageContext' | 'UserContext' | 'AnySelectMenu' | 'Button' | 'Autocomplete' | 'ModalSubmit';
  public abstract data: SlashCommandBuilder;
  public abstract execute(interaction: Interaction, ...args: any[]): Promise<void>;
}

export default SlashCommand;
