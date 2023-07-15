import { ActionRowBuilder, EmbedBuilder, ModalActionRowComponentBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from 'discord.js';
import { ModalSubmitSlashCommand } from '../../../SlashCommand';

type ModalParameters = {
  profileName?: string;
  characterName?: string;
  context?: string;
  greeting?: string;
  exampleDialogue?: string;
};

class CreateCharacter extends ModalSubmitSlashCommand {
  public name: string = 'create-character';
  readonly modalId: string = 'create-character';
  readonly modalIdMap = {
    profileName: 'profile-name',
    characterName: 'character-name',
    context: 'context',
    greeting: 'greeting',
    exampleDialogue: 'example-dialogue',
  };
  public async execute(interaction: ModalSubmitInteraction, ...args: any[]): Promise<void> {
    //
    await interaction.deferReply({ ephemeral: true });
    const profileName = interaction.fields.getTextInputValue(this.modalIdMap.profileName);
    const characterName = interaction.fields.getTextInputValue(this.modalIdMap.characterName);
    const context = interaction.fields.getTextInputValue(this.modalIdMap.context);
    const greeting = interaction.fields.getTextInputValue(this.modalIdMap.greeting);
    const exampleDialogue = interaction.fields.getTextInputValue(this.modalIdMap.exampleDialogue);
    const embed = new EmbedBuilder()
      .setTitle('Character Created')
      .setDescription(`Profile Name: ${profileName}\nCharacter Name: ${characterName}\nContext: ${context}\nGreeting: ${greeting}\nExample Dialogue: ${exampleDialogue}`);
    interaction.followUp({
      content: 'Character Created',
      embeds: [embed],
      ephemeral: true,
    });
  }
  public getModal({ profileName = '', characterName = '', context = '', greeting = '', exampleDialogue = '' }: ModalParameters = {}) {
    const modal = new ModalBuilder().setTitle('Create Character').setCustomId(this.modalId);

    const profileNameInput = new TextInputBuilder()
      .setCustomId(this.modalIdMap.profileName)
      .setLabel('Name of the Character Profile')
      .setPlaceholder('Enter Profile Name')
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    if (profileName.length > 0) profileNameInput.setValue(profileName);

    const characterNameInput = new TextInputBuilder()
      .setCustomId(this.modalIdMap.characterName)
      .setLabel('Name of the Character')
      .setPlaceholder('Enter Character Name')
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    if (characterName.length > 0) characterNameInput.setValue(characterName);

    const contextInput = new TextInputBuilder()
      .setCustomId(this.modalIdMap.context)
      .setLabel('Context of the Character')
      .setPlaceholder('Enter Context')
      .setValue(context || '')
      .setMaxLength(400)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const greetingInput = new TextInputBuilder()
      .setCustomId(this.modalIdMap.greeting)
      .setLabel('Greeting of the Character')
      .setPlaceholder('Enter Greeting')
      .setValue(greeting || '')
      .setMaxLength(400)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    const exampleDialogueInput = new TextInputBuilder()
      .setCustomId(this.modalIdMap.exampleDialogue)
      .setLabel('Example Dialogue of the Character')
      .setPlaceholder('Enter Example Dialogue')
      .setValue(exampleDialogue || '')
      .setMaxLength(400)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    //
    const profileNameActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(profileNameInput);
    const characterNameActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(characterNameInput);
    const contextActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(contextInput);
    const greetingActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(greetingInput);
    const exampleDialogueActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(exampleDialogueInput);
    //
    modal.addComponents(profileNameActionRow, characterNameActionRow, contextActionRow, greetingActionRow, exampleDialogueActionRow);
    //
    return modal;
  }
}

export { CreateCharacter };
