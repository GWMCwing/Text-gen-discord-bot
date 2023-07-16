CREATE SCHEMA IF NOT EXISTS "Chat";
-- 
CREATE TABLE IF NOT EXISTS "Chat"."preset"(
    "id" INTEGER PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    -- [0,2] or null
    "temperature" DECIMAL(8, 5) DEFAULT NULL,
    -- [0,1] or null
    "top_p" DECIMAL(8, 5) DEFAULT NULL,
    -- [0,200] or null
    "top_k" INTEGER DEFAULT NULL,
    -- [0,1] or null
    "typical_p" DECIMAL(8, 5) DEFAULT NULL,
    -- [0,9] or null
    "epsilon_cutoff" INTEGER DEFAULT NULL,
    -- [0,20] or null
    "eta_cutoff" INTEGER DEFAULT NULL,
    -- [1,1.5] or null
    "repetition_penalty" DECIMAL(8, 5) DEFAULT NULL,
    -- [0,4096] or null
    "repetition_penalty_range" INTEGER DEFAULT NULL,
    -- [0.8, 1.5]
    "encoder_repetition_penalty" DECIMAL(8, 5) DEFAULT NULL,
    -- [0,20]
    "no_repeat_ngram_size" INTEGER DEFAULT NULL,
    -- [0,2000]
    "min_length" INTEGER DEFAULT NULL,
    -- [0,1]
    "tfs" DECIMAL(8, 5) DEFAULT NULL,
    -- [0,1]
    "top_a" DECIMAL(8, 5) DEFAULT NULL,
    -- boolean
    "do_sample" BOOLEAN DEFAULT true
);
-- 
CREATE TABLE IF NOT EXISTS "Chat"."setting"(
    "id" INTEGER PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    -- 
    "dark_theme" BOOLEAN NOT NULL DEFAULT false,
    "autoload_model" BOOLEAN NOT NULL DEFAULT false,
    "max_new_tokens" INTEGER NOT NULL DEFAULT 200,
    "max_new_tokens_min" INTEGER NOT NULL DEFAULT 0,
    "max_new_tokens_max" INTEGER NOT NULL DEFAULT 2000,
    "seed" INTEGER NOT NULL DEFAULT -1,
    "character" TEXT NOT NULL DEFAULT 'None',
    "name1" TEXT NOT NULL DEFAULT 'You',
    "name2" TEXT NOT NULL DEFAULT 'Assistant',
    "context" TEXT NOT NULL DEFAULT '',
    "greeting" TEXT NOT NULL DEFAULT '',
    "turn_template" TEXT NOT NULL DEFAULT '',
    "custom_stopping_strings" TEXT NOT NULL DEFAULT '',
    "stop_at_newline" BOOLEAN NOT NULL DEFAULT false,
    "add_bos_token" BOOLEAN NOT NULL DEFAULT true,
    "ban_eos_token" BOOLEAN NOT NULL DEFAULT false,
    "skip_special_tokens" BOOLEAN NOT NULL DEFAULT true,
    "truncation_length" INTEGER NOT NULL DEFAULT 2048,
    "truncation_length_min" INTEGER NOT NULL DEFAULT 0,
    "truncation_length_max" INTEGER NOT NULL DEFAULT 16384,
    "mode" TEXT NOT NULL DEFAULT 'chat',
    "start_with" TEXT NOT NULL DEFAULT '',
    "chat_style" TEXT NOT NULL DEFAULT 'cai-chat',
    "instruction_template" TEXT NOT NULL DEFAULT 'None',
    "chat-instruct_command" TEXT NOT NULL DEFAULT 'Continue the chat dialogue below. Write a single reply for\nthe character "<|character|>".\n\n<|prompt|>',
    "chat_generation_attempts" INTEGER NOT NULL DEFAULT 1,
    "chat_generation_attempts_min" INTEGER NOT NULL DEFAULT 1,
    "chat_generation_attempts_max" INTEGER NOT NULL DEFAULT 10,
    "default_extensions" TEXT [] NOT NULL DEFAULT '{}',
    "chat_default_extensions" TEXT [] NOT NULL DEFAULT '{}',
    "preset" TEXT NOT NULL DEFAULT 'simple-1',
    "prompt" TEXT NOT NULL DEFAULT 'QA'
);