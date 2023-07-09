import { ChatInputCommandInteraction, Client, Events, ModalSubmitInteraction } from 'discord.js';
import { chatInputCommandInteractionCommands, commands, modalSubmitInteractionCommands } from '../command/commandList';
import logger from '../../utility/logging/logging';
class CommandHandler {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  public async start() {
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.isChatInputCommand()) this.handleChatInputCommand(interaction);
      if (interaction.isModalSubmit()) this.handleModalSubmitCommand(interaction);
    });
  }
  private async handleChatInputCommand(interaction: ChatInputCommandInteraction) {
    const command = interaction.commandName;
    const args = interaction.options;
    if (!chatInputCommandInteractionCommands.has(command)) return;
    try {
      await chatInputCommandInteractionCommands.get(command)!.execute(interaction, args);
    } catch (err) {
      logger.error(err);
      await interaction.reply({
        content: 'An error occurred while executing this command',
        ephemeral: true,
      });
    }
  }
  private async handleModalSubmitCommand(interaction: ModalSubmitInteraction) {
    const command = interaction.customId;
    if (!modalSubmitInteractionCommands.has(command)) return;
    try {
      await modalSubmitInteractionCommands.get(command)!.execute(interaction);
    } catch (err) {
      logger.error(err);
      await interaction.reply({
        content: 'An error occurred while executing this command',
        ephemeral: true,
      });
    }
  }
}

export default CommandHandler;
