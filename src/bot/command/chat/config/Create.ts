import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';
import { ChatInputSlashCommand } from '../../SlashCommand';
import { CreateCharacter } from './entity/character/Create';

class CreateConfig extends ChatInputSlashCommand {
  readonly idMap = {
    optionName: 'config-type',
  };
  public data = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a new config')
    .addStringOption((option) =>
      option
        .setName(this.idMap.optionName)
        .setDescription('Name of the config')
        .setRequired(true)
        .addChoices({ name: 'Character', value: 'character' }, { name: 'Preset', value: 'preset' }, { name: 'Setting', value: 'setting' })
    );

  public async execute(interaction: ChatInputCommandInteraction, ...args: any[]): Promise<void> {
    const configType = interaction.options.getString(this.idMap.optionName);
    if (configType === 'character') {
      const modal = new CreateCharacter().getModal();
      try {
        await interaction.showModal(modal);
      } catch (err) {
        console.log(err);
      }
      return;
    }
    if (configType === 'preset') {
      //
      return;
    }
    if (configType === 'setting') {
      //
      return;
    }
  }
}

export { CreateConfig };
