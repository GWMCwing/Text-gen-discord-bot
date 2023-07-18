import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType } from 'discord.js';
import { ChatInputSlashCommand } from '../../SlashCommand';
import { discord } from '../../../../database/Handler';
import logger from '../../../../utility/logging/logging';
import { guildCache } from '../../../../utility/Cache/GuildCache';

const loggerMeta = {
  label: 'Command/RegisterChannel',
};

class RegisterChannel extends ChatInputSlashCommand {
  public data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register this channel for text-gen');
  //
  public async execute(interaction: ChatInputCommandInteraction<CacheType>, ...args: any[]): Promise<unknown> {
    await interaction.deferReply({ ephemeral: true });
    const guild = interaction.guild;
    if (!guild) return interaction.editReply({ content: 'This command can only be used in a guild' });
    const channel = interaction.channel;
    if (!channel) return interaction.editReply({ content: 'This command can only be used in a channel' });
    if (channel.isDMBased()) return interaction.editReply({ content: 'This command can only be used in a guild channel' });
    const channelId = channel.id;
    const guildId = guild.id;
    // check if channel already registered
    let guildData = await guildCache.get(guildId);
    if (guildData) {
      if (guildData.registeredChannels.includes(channelId)) {
        return interaction.editReply({
          content: `Channel <#${channelId}> already registered`,
        });
      }
      // add channel to guild data
      guildData.registeredChannels.push(channelId);
      // save in cache
    } else {
      guildData = {
        id: guildId,
        registeredChannels: [channelId],
      };
    }
    const success = await guildCache.set(guildId, guildData);
    if (!success) {
      logger.error(`Error while setting guild ${guildId} to cache`, loggerMeta);
      return interaction.editReply({
        content: `Error while registering channel <#${channelId}>`,
      });
    }
    await interaction.editReply({
      content: `Registered channel <#${channelId}>.`,
    });
  }
}

export default RegisterChannel;
