import { ChannelType, Client, Message } from 'discord.js';
import { guildCache, GuildData, GuildCache } from '../../utility/Cache/GuildCache';
import Handler from './Handler';

class ChatHandler extends Handler {
  private guildCache: GuildCache = guildCache;
  private readonly allowedChannels: ChannelType[] = [ChannelType.GuildText, ChannelType.PrivateThread, ChannelType.PublicThread];

  constructor(client: Client) {
    super(client);
  }

  public async start() {
    this.startHandleChat();
  }

  private async startHandleChat() {
    this.client.on('message', async (message: Message) => {
      if (message.author.bot) return;
      if (!this.allowedChannels.includes(message.channel.type)) return;
      const guild = message.guild;
      if (!guild) return;
      const guildId = guild.id;
      const guildData = await this.guildCache.get(guildId);
      if (!guildData) {
        const newGuildData: GuildData = {
          id: guildId,
          registeredChannels: [],
        };
        this.guildCache.set(guildId, newGuildData);
        return;
      }
      const registeredChannels = guildData.registeredChannels;
      if (!registeredChannels.includes(message.channel.id)) return;
      message.react('👍');
    });
  }
}

export default ChatHandler;
