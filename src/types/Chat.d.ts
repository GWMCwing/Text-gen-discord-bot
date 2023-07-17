import { Preset, Setting } from './Database';

type ChatHistory = {
  internal: string[][];
  visible: string[][];
};

export type ChatData = {
  history: ChatHistory;
  character_name1: string; // name of the user
  character_name2: string; // name of the character
  character_greeting: string;
  character_context: string;
  chat_generation_attempts: number;
} & (
  | {
      regenerate: false;
      _continue: false;
    }
  | {
      regenerate: true;
      _continue: false;
    }
  | {
      regenerate: false;
      _continue: true;
    }
) &
  Pick<
    Preset,
    | 'temperature'
    | 'top_p'
    | 'encoder_repetition_penalty'
    | 'epsilon_cutoff'
    | 'eta_cutoff'
    | 'min_length'
    | 'no_repeat_ngram_size'
    | 'repetition_penalty'
    | 'do_sample'
    | 'repetition_penalty_range'
    | 'tfs'
    | 'top_a'
    | 'top_k'
    | 'typical_p'
  > &
  Pick<Setting, 'max_new_tokens' | 'add_bos_token' | 'seed' | 'truncation_length' | 'ban_eos_token' | 'skip_special_tokens' | 'stopping_strings' | 'stop_at_newline'>;
