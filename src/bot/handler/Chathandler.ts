import { ChannelType, Client, Message } from 'discord.js';
import GuildCache, { GuildData } from '../../utility/Cache/GuildCache';
import Handler from './Handler';

class ChatHandler extends Handler {
  private guildCache: GuildCache = new GuildCache();

  constructor(client: Client) {
    super(client);
  }

  public async start() {
    this.startHandleChat();
  }

  private async startHandleChat() {
    this.client.on('message', async (message: Message) => {
      if (message.author.bot) return;
      if (message.channel.type === ChannelType.DM) return;
      const guild = message.guild;
      if (!guild) return;
      const guildId = guild.id;
      const guildData = this.guildCache.get(guildId);
      if (!guildData) {
        const data: GuildData = {
          id: guildId,
        };
        this.guildCache.set(guildId, data);
      }
      //
    });
  }
}

export default ChatHandler;
