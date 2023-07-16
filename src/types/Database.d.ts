type WithDefault<T> = T;
type Nullable<T> = T | null;
type NullableWithDefault<T> = WithDefault<Nullable<T>>;

interface WithId {
  id: WithDefault<string>;
}

interface WithCreatedAt {
  createdAt: WithDefault<Date>;
}

interface WithLastUpdate {
  last_update: WithDefault<Date>;
}

interface DiscordGuild extends WithCreatedAt {
  guild_id: WithDefault<string>;
}

interface DiscordChannel extends WithCreatedAt {
  channel_id: WithDefault<string>;
  guild_id: WithDefault<string>;
}

interface DiscordUser extends WithCreatedAt {
  user_id: WithDefault<string>;
}

interface Chat extends WithId, WithCreatedAt, WithLastUpdate {
  history_internal: WithDefault<string[]>;
  history_visible: WithDefault<string[]>;
  max_new_tokens: WithDefault<number>;
  your_name: WithDefault<string>;
  stop_at_newline: WithDefault<boolean>;
  chat_generation_attempts: WithDefault<number>;
  seed: WithDefault<number>;
  add_bos_token: WithDefault<boolean>;
  truncation_length: WithDefault<number>;
  ban_eos_token: WithDefault<boolean>;
  skip_special_tokens: WithDefault<boolean>;
  stopping_strings: WithDefault<string[]>;
  // trigger
  total_history_internal_character: WithDefault<number>;
  total_history_visible_character: WithDefault<number>;
  // fk
  channel_id: string;
  character_id: Nullable<string>;
  preset_id: Nullable<string>;
  setting_id: Nullable<string>;
}

interface Character extends WithId, WithCreatedAt, WithLastUpdate {
  profile_name: WithDefault<string>;
  context: WithDefault<string>;
  // fk
  user_id: string;
}

interface Preset extends WithId, WithCreatedAt, WithLastUpdate {
  name: string;
  //
  temperature: WithDefault<number>;
  top_p: WithDefault<number>;
  top_k: WithDefault<number>;
  typical_p: WithDefault<number>;
  epsilon_cutoff: WithDefault<number>;
  eta_cutoff: WithDefault<number>;
  repetition_penalty: WithDefault<number>;
  repetition_penalty_range: WithDefault<number>;
  encoder_repetition_penalty: WithDefault<number>;
  no_repeat_ngram_size: WithDefault<number>;
  min_length: WithDefault<number>;
  tfs: WithDefault<number>;
  top_a: WithDefault<number>;
  do_sample: WithDefault<boolean>;
  // fk
  user_id: string;
}

interface Setting extends WithId, WithCreatedAt, WithLastUpdate {
  name: string;
  context: string;
  greeting: string;
  turn_template: string;
  //
  dark_theme: WithDefault<boolean>;
  autoload_model: WithDefault<boolean>;
  max_new_tokens: WithDefault<number>;
  max_new_tokens_min: WithDefault<number>;
  max_new_tokens_max: WithDefault<number>;
  seed: WithDefault<boolean>;
  name1: WithDefault<string>;
  name2: WithDefault<string>;
  custom_stopping_strings: WithDefault<string>;
  stop_at_newline: WithDefault<boolean>;
  add_bos_token: WithDefault<boolean>;
  ban_eos_token: WithDefault<boolean>;
  skip_special_tokens: WithDefault<boolean>;
  truncation_length: WithDefault<number>;
  truncation_length_min: WithDefault<number>;
  truncation_length_max: WithDefault<number>;
  mode: WithDefault<number>;
  chat_generation_attempts_min: WithDefault<number>;
  chat_generation_attempts_max: WithDefault<number>;
  default_extensions: WithDefault<string[]>;
  chat_default_extensions: WithDefault<string[]>;
  // fk
  user_id: string;
}
