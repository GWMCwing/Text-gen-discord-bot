import cornJob from 'node-cron';
import Cache from './Cache';
import logger from '../logging/logging';
import { discord } from '../../database/Handler';

const loggerMeta = {
  label: 'Cache/GuildCache',
};

export interface GuildData {
  id: string;
  registeredChannels: string[];
}

class GuildCache extends Cache<string, GuildData> {
  constructor(expirationTime: number) {
    super(expirationTime); // 1 hours
  }

  protected async setToSource(key: string, value: GuildData): Promise<boolean> {
    const { id, registeredChannels } = value;
    logger.debug(`Setting guild ${id} to database`, loggerMeta);
    const guildChannelPair = registeredChannels.map((channel) => ({
      guild_id: id,
      channel_id: channel,
    }));
    // set id to guild table
    const { error: error_g } = await discord.from('discord_guild').upsert([
      {
        guild_id: id,
      },
    ]);
    if (error_g) {
      logger.error(`Error while setting guild ${id} to database`, loggerMeta);
      logger.error(error_g);
      return false;
    }
    // set all registered channels to guild_channel table
    const { error: error_c } = await discord.from('discord_channel').upsert(guildChannelPair, {
      onConflict: 'channel_id',
      ignoreDuplicates: true,
    });
    if (error_c) {
      logger.error(`Error while setting channels to database`, loggerMeta);
      logger.error(error_c);
      return false;
    }
    return true;
  }

  protected async getFromSource(guildId: string): Promise<GuildData | undefined> {
    // construct guild data from database
    const { data: channelData, error: error_g } = await discord.from('discord_channel').select('channel_id').eq('guild_id', guildId);
    if (error_g) {
      logger.error(`Error while getting guild channels ${guildId} from database`, loggerMeta);
      logger.error(error_g);
      return undefined;
    }
    if (channelData.length === 0) return undefined;
    const guildData: GuildData = {
      id: guildId,
      registeredChannels: channelData.map((channel) => channel.channel_id),
    };
    // return guild data
    return guildData;
  }
  // override
  // override to rename parameter name
  public override get(guildId: string): Promise<GuildData | undefined> {
    return super.get(guildId);
  }
  public override set(guildId: string, guildData: GuildData): Promise<boolean> {
    return super.set(guildId, guildData);
  }
}

export const guildCache = new GuildCache(1000 * 60 * 60);
export type { GuildCache };

cornJob.schedule('0 0 * * * *', () => {
  guildCache.clear();
  logger.info('Expired guild cache cleared', {
    label: 'CronJob',
  });
});
