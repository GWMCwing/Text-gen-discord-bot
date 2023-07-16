-- Text Gen setting
-- Character
CREATE TABLE IF NOT EXISTS test_discord_chat."character" (
    id uuid NOT NULL DEFAULT uuid_generate_v4() CONSTRAINT PK_ID PRIMARY KEY,
    context text NOT NULL DEFAULT '' :: text,
    greeting text NOT NULL DEFAULT '' :: text,
    example_dialogue text NOT NULL DEFAULT '' :: text,
    last_update timestamp with time zone NOT NULL DEFAULT now(),
    profile_name text NOT NULL DEFAULT '' :: text,
    character_name text NOT NULL DEFAULT '' :: text
) -- Chat
CREATE TABLE IF NOT EXISTS test_discord_chat.chat (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    history_internal text [] NOT NULL DEFAULT '{}' :: text [],
    history_visible text [] NOT NULL DEFAULT '{}' :: text [],
    max_new_tokens integer NOT NULL DEFAULT 250,
    your_name text NOT NULL DEFAULT 'You' :: text,
    stop_at_newline boolean NOT NULL DEFAULT false,
    chat_generation_attempts integer NOT NULL DEFAULT 1,
    seed integer NOT NULL DEFAULT '-1' :: integer,
    add_bos_token boolean NOT NULL DEFAULT true,
    truncation_length integer NOT NULL DEFAULT 2048,
    ban_eos_token boolean NOT NULL DEFAULT false,
    skip_special_tokens boolean NOT NULL DEFAULT true,
    stopping_strings text [] NOT NULL DEFAULT '{}' :: text [],
    discord_channel_id text,
    discord_guild_id text,
    last_update timestamp with time zone NOT NULL DEFAULT now(),
    total_history_internal_character integer NOT NULL DEFAULT 0,
    total_history_visible_character integer NOT NULL DEFAULT 0,
    character_id uuid,
    preset_id uuid,
    setting_id uuid,
    -- 
    CONSTRAINT "PK_ID" PRIMARY KEY (id),
    CONSTRAINT "UQ_character_id" UNIQUE (character_id),
    CONSTRAINT "UQ_preset_id" UNIQUE (preset_id),
    CONSTRAINT "UQ_setting_id" UNIQUE (setting_id),
    -- 
    CONSTRAINT "FK_character_id" FOREIGN KEY (character_id) REFERENCES test_discord_chat."character" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET
        NULL,
        CONSTRAINT "FK_preset_id" FOREIGN KEY (preset_id) REFERENCES test_discord_chat.preset (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET
        NULL,
        CONSTRAINT "FK_setting_id" FOREIGN KEY (setting_id) REFERENCES test_discord_chat.setting (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET
        NULL
) -- Preset
CREATE TABLE IF NOT EXISTS test_discord_chat.preset (
    id uuid NOT NULL DEFAULT uuid_generate_v4() CONSTRAINT PK_ID PRIMARY KEY,
    name text NOT NULL,
    temperature numeric(9, 5),
    top_p numeric(9, 5),
    top_k integer,
    typical_p numeric(9, 5),
    epsilon_cutoff integer,
    eta_cutoff integer,
    repetition_penalty numeric(9, 5),
    repetition_penalty_range integer,
    encoder_repetition_penalty numeric(9, 5),
    no_repeat_ngram_size integer,
    min_length integer,
    tfs numeric(9, 5),
    top_a numeric(9, 5),
    do_sample boolean,
    last_update timestamp with time zone NOT NULL DEFAULT now(),
    -- 
    CONSTRAINT "UQ_name" UNIQUE (name)
) -- chat setting
CREATE TABLE IF NOT EXISTS test_discord_chat.setting (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    dark_theme boolean NOT NULL DEFAULT false,
    autoload_model boolean NOT NULL DEFAULT false,
    max_new_tokens integer NOT NULL DEFAULT 200,
    max_new_tokens_min integer NOT NULL DEFAULT 0,
    max_new_tokens_max integer NOT NULL DEFAULT 2000,
    seed integer NOT NULL DEFAULT '-1' :: integer,
    "character" text NOT NULL DEFAULT 'None' :: text,
    name1 text NOT NULL DEFAULT 'You' :: text,
    name2 text NOT NULL DEFAULT 'Assistant' :: text,
    context text NOT NULL DEFAULT '' :: text,
    greeting text NOT NULL DEFAULT '' :: text,
    turn_template text NOT NULL DEFAULT '' :: text,
    custom_stopping_strings text NOT NULL DEFAULT '' :: text,
    stop_at_newline boolean NOT NULL DEFAULT false,
    add_bos_token boolean NOT NULL DEFAULT true,
    ban_eos_token boolean NOT NULL DEFAULT false,
    skip_special_tokens boolean NOT NULL DEFAULT true,
    truncation_length integer NOT NULL DEFAULT 2048,
    truncation_length_min integer NOT NULL DEFAULT 0,
    truncation_length_max integer NOT NULL DEFAULT 16384,
    mode text NOT NULL DEFAULT 'chat' :: text,
    start_with text NOT NULL DEFAULT '' :: text,
    chat_style text NOT NULL DEFAULT 'cai-chat' :: text,
    instruction_template text NOT NULL DEFAULT 'None' :: text,
    "chat-instruct_command" text NOT NULL DEFAULT 'Continue the chat dialogue below. Write a single reply for
the character "<|character|>".

<|prompt|>' :: text,
    chat_generation_attempts integer NOT NULL DEFAULT 1,
    chat_generation_attempts_min integer NOT NULL DEFAULT 1,
    chat_generation_attempts_max integer NOT NULL DEFAULT 10,
    default_extensions text [] NOT NULL DEFAULT '{}' :: text [],
    chat_default_extensions text [] NOT NULL DEFAULT '{}' :: text [],
    preset text NOT NULL DEFAULT 'simple-1' :: text,
    prompt text NOT NULL DEFAULT 'QA' :: text,
    last_update timestamp with time zone NOT NULL DEFAULT now(),
    -- 
    CONSTRAINT "PK_ID" PRIMARY KEY (id, name),
    CONSTRAINT "UQ_name" UNIQUE (name)
) -- Discord
-- Discord Guild
CREATE TABLE IF NOT EXISTS test_discord_chat.discord_guild(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    guild_id text NOT NULL,
    registered_channels uuid [] NOT NULL DEFAULT '{}' :: uuid [],
    --
    CONSTRAINT "PK_id_discord_guild" PRIMARY KEY (id, guild_id) CONSTRAINT "FK_registered_channels" FOREIGN KEY (registered_channels) REFERENCES test_discord_chat.discord_channel (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET
        NULL
) -- Discord Channel
CREATE TABLE IF NOT EXISTS test_discord_chat.discord_channel(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    channel_id text NOT NULL,
    guild_id text NOT NULL,
    -- 
    CONSTRAINT "PK_id_discord_channel" PRIMARY KEY (id, channel_id) CONSTRAINT "FK_guild_id" FOREIGN KEY (guild_id) REFERENCES test_discord_chat.discord_guild (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET
        NULL
);

-- Discord User
CREATE TABLE IF NOT EXISTS test_discord_chat.discord_user (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    last_update timestamp with time zone NOT NULL DEFAULT now(),
    discord_user_id text NOT NULL,
    discord_user_name text NOT NULL,
    CONSTRAINT "PK_id_discord_user" PRIMARY KEY (id, discord_user_id)
);