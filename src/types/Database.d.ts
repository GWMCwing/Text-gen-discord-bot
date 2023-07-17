import { GenericFunction, GenericSchema, GenericTable, GenericView } from '@supabase/postgrest-js/dist/module/types';
//
//
type Nullable<T> = T | null;
type AllPresent<T> = {
  [K in keyof T]-?: T[K];
};
// type ExcludeWithDefault<T> = ExcludeField<T, WithDefault<keyof T>>;
//
type TriggerColumn = 'id' | 'createdAt' | 'last_update';
//
type TableRow<T> = {
  [K in keyof T]: T[K];
};
// remove Trigger Column from T, make WithDefault and Nullable optional
type UpdateRow<T extends TableRow<T>, O extends string | null = null> = O extends string ? Omit<T, TriggerColumn | O> : Omit<T, TriggerColumn>;
type InsertRow<T extends TableRow<T>, O extends string | null = null> = UpdateRow<T, O>;

interface WithId {
  id?: string;
}

interface WithCreatedAt {
  createdAt?: Date;
}

interface WithLastUpdate {
  last_update?: Date;
}

interface DiscordGuild extends WithCreatedAt {
  guild_id: string;
}

interface DiscordChannel extends WithCreatedAt {
  channel_id: string;
  guild_id: string;
}

interface DiscordUser extends WithCreatedAt {
  user_id: string;
}

interface Chat extends WithId, WithCreatedAt, WithLastUpdate {
  history_internal?: string[];
  history_visible?: string[];
  max_new_tokens?: number;
  your_name?: string;
  stop_at_newline?: boolean;
  chat_generation_attempts?: number;
  seed?: number;
  add_bos_token?: boolean;
  truncation_length?: number;
  ban_eos_token?: boolean;
  skip_special_tokens?: boolean;
  stopping_strings?: string[];
  // trigger
  total_history_internal_character?: number;
  total_history_visible_character?: number;
  // fk
  channel_id: string;
  character_id: Nullable<string>;
  preset_id: Nullable<string>;
  setting_id: Nullable<string>;
}

interface Character extends WithId, WithCreatedAt, WithLastUpdate {
  profile_name: string;
  name2: string;
  greeting: string;
  context: string;
  // fk
  user_id: string;
}

interface Preset extends WithId, WithCreatedAt, WithLastUpdate {
  name: string;
  //
  temperature?: number;
  top_p?: number;
  top_k?: number;
  typical_p?: number;
  epsilon_cutoff?: number;
  eta_cutoff?: number;
  repetition_penalty?: number;
  repetition_penalty_range?: number;
  encoder_repetition_penalty?: number;
  no_repeat_ngram_size?: number;
  min_length?: number;
  tfs?: number;
  top_a?: number;
  do_sample?: boolean;
  // fk
  user_id: string;
}

interface Setting extends WithId, WithCreatedAt, WithLastUpdate {
  name: string;
  //
  max_new_tokens?: number;
  max_new_tokens_min?: number;
  max_new_tokens_max?: number;
  seed?: boolean;
  name1?: string;
  custom_stopping_strings?: string;
  stopping_strings?: string[];
  stop_at_newline?: boolean;
  add_bos_token?: boolean;
  ban_eos_token?: boolean;
  skip_special_tokens?: boolean;
  truncation_length?: number;
  truncation_length_min?: number;
  truncation_length_max?: number;
  mode?: string;
  chat_generation_attempts_min?: number;
  chat_generation_attempts_max?: number;
  // fk
  user_id: string;
}

// Tables

export class DiscordGuildTable implements GenericTable {
  Row: AllPresent<TableRow<DiscordGuild>>;
  Insert: InsertRow<DiscordGuild>;
  Update: UpdateRow<DiscordGuild>;
}

export class DiscordChannelTable implements GenericTable {
  Row: AllPresent<TableRow<DiscordChannel>>;
  Insert: InsertRow<DiscordChannel>;
  Update: UpdateRow<DiscordChannel>;
}

export class DiscordUserTable implements GenericTable {
  Row: AllPresent<TableRow<DiscordUser>>;
  Insert: InsertRow<DiscordUser>;
  Update: UpdateRow<DiscordUser>;
}

export class ChatTable implements GenericTable {
  Row: AllPresent<TableRow<Chat>>;
  Insert: InsertRow<Chat>;
  Update: UpdateRow<Chat>;
}

export class CharacterTable implements GenericTable {
  Row: AllPresent<TableRow<Character>>;
  Insert: InsertRow<Character>;
  Update: UpdateRow<Character>;
}

export class PresetTable implements GenericTable {
  Row: AllPresent<TableRow<Preset>>;
  Insert: InsertRow<Preset>;
  Update: UpdateRow<Preset>;
}

export class SettingTable implements GenericTable {
  Row: AllPresent<TableRow<Setting>>;
  Insert: InsertRow<Setting>;
  Update: UpdateRow<Setting>;
}

// schema

export class DiscordSchema implements GenericSchema {
  Tables: {
    discord_guild: DiscordGuildTable;
    discord_channel: DiscordChannelTable;
    discord_user: DiscordUserTable;
  };
  Views: Record<string, GenericView>;
  Functions: Record<string, GenericFunction>;
}

export class DiscordChatSchema implements GenericSchema {
  Tables: {
    chat: ChatTable;
    character: CharacterTable;
    preset: PresetTable;
    setting: SettingTable;
  };
  Views: Record<string, GenericView>;
  Functions: Record<string, GenericFunction>;
}

// Database

export class DiscordDatabase {
  discord: DiscordSchema;
  discord_chat: DiscordChatSchema;
}

// export

export type {
  // utility
  WithCreatedAt,
  WithId,
  WithLastUpdate,
  TableRow,
  InsertRow,
  UpdateRow,
  TriggerColumn,
  // entity
  Character,
  Chat,
  DiscordChannel,
  DiscordGuild,
  DiscordUser,
  Nullable,
  Preset,
  Setting,
};
