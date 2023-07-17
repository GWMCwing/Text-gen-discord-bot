import { PostgrestClient } from '@supabase/postgrest-js';
import { DiscordDatabase } from '../types/Database';

const POSTGRES_REST_URL = process.env.POSTGRES_REST_URL;
if (!POSTGRES_REST_URL) throw new Error('POSTGRES_REST_URL is not defined');

class PostgrestHandler {
  private _discord: PostgrestClient<DiscordDatabase, 'discord'>;
  private _discord_chat: PostgrestClient<DiscordDatabase, 'discord_chat'>;

  constructor(private _url: string) {
    this._discord = new PostgrestClient(_url, {
      schema: 'discord',
    });
    this._discord_chat = new PostgrestClient(_url, {
      schema: 'discord_chat',
    });
  }

  get discord() {
    return this._discord;
  }

  get discord_chat() {
    return this._discord_chat;
  }
}

function getPostgrestClient(url: string) {
  return new PostgrestHandler(url);
}

export const { discord, discord_chat } = getPostgrestClient(POSTGRES_REST_URL);
