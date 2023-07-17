import { AxiosResponse } from 'axios';
import { Character, Preset, Setting } from '../../types/Database';
import getAxiosInstance from './axiosInstance';
import { ChatData, ChatHistory } from '../../types/Chat';
import { discord_chat } from '../../database/Handler';

type requestJson = {
  user_input: string;
  mode: 'chat';
  character: 'None';
  instruction_template: 'None';
} & ChatData;

type responseJson = {
  results: [
    {
      history: ChatHistory;
    }
  ];
};

async function getChatData(guildId: string, channelId: string): Promise<ChatData | null> {
  // create a view
  const { data: ChatData, error: cErr } = await discord_chat
    .from('chat')
    .select(
      `
    history_internal,
    history_visible,
    your_name,
    stop_at_newline,
    chat_generation_attempts,
    preset(
      temperature,
      top_p,
      encoder_repetition_penalty,
      epsilon_cutoff,
      eta_cutoff,
      min_length,
      no_repeat_ngram_size,
      repetition_penalty,
      do_sample,
      repetition_penalty_range,
      tfs,
      top_a,
      top_k,
      typical_p
    ),
    setting(
      max_new_tokens,
      add_bos_token,
      seed,
      truncation_length,
      ban_eos_token,
      skip_special_tokens,
      stopping_strings,
      stop_at_newline
    ),
    character(
      name2,
      greeting,
      context
    )
    `
    )
    .eq('channel_id', channelId)
    .limit(1);
  if (cErr) {
    console.log(cErr);
    return null;
  }
  if (ChatData.length === 0) {
    return null;
  }
  const chatData = ChatData[0];
  const preset = chatData.preset[0];
  const setting = chatData.setting[0];
  const character = chatData.character[0];
  const chatDataJson: ChatData = {
    history: {
      internal: chatData.history_internal,
      visible: chatData.history_visible,
    },
    character_name1: chatData.your_name,
    character_name2: character.name2,
    character_greeting: character.greeting,
    character_context: character.context,
    chat_generation_attempts: chatData.chat_generation_attempts,
    regenerate: false,
    _continue: false,
    temperature: preset.temperature,
    top_p: preset.top_p,
    encoder_repetition_penalty: preset.encoder_repetition_penalty,
    epsilon_cutoff: preset.epsilon_cutoff,
    eta_cutoff: preset.eta_cutoff,
    min_length: preset.min_length,
    no_repeat_ngram_size: preset.no_repeat_ngram_size,
    repetition_penalty: preset.repetition_penalty,
    do_sample: preset.do_sample,
    repetition_penalty_range: preset.repetition_penalty_range,
    tfs: preset.tfs,
    top_a: preset.top_a,
    top_k: preset.top_k,
    typical_p: preset.typical_p,
    max_new_tokens: setting.max_new_tokens,
    add_bos_token: setting.add_bos_token,
    seed: setting.seed,
    truncation_length: setting.truncation_length,
    ban_eos_token: setting.ban_eos_token,
    skip_special_tokens: setting.skip_special_tokens,
    stopping_strings: setting.stopping_strings,
    stop_at_newline: setting.stop_at_newline,
  };
  return chatDataJson;
}

async function generateChat(guildId: string, channelId: string, userInput: string): Promise<ChatHistory | null> {
  // get ChatData
  let chatData = await getChatData(guildId, channelId);
  if (!chatData) {
    return null;
  }
  // filter all null values
  chatData = Object.fromEntries(Object.entries(chatData).filter(([, v]) => v !== null)) as ChatData;

  const axios = getAxiosInstance();
  const response = await axios
    .post<responseJson, AxiosResponse<responseJson, any>, requestJson>('/v1/chat', {
      ...chatData,
      mode: 'chat',
      character: 'None',
      instruction_template: 'None',
      user_input: userInput,
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return response?.data.results[0].history || null;
}

export default generateChat;
