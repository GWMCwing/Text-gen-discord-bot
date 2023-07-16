import { Channel } from 'discord.js';
import Cache from './Cache';

export interface GuildData {
  id: string;
  registeredChannels: Channel[];
}

class GuildCache extends Cache<string, GuildData> {
  protected setToSource(key: string, value: GuildData): void {
    // TODO:
    return;
  }
  constructor() {
    super(1000 * 60 * 60 * 1); // 1 hours
  }

  protected getFromSource(key: string): GuildData | undefined {
    // TODO:
    return {
      id: key,
      registeredChannels: [],
    };
  }
}

export default GuildCache;
