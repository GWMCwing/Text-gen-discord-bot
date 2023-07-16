-- Text-gen Database
-- Time: 2023-07-16
--
-- transaction
BEGIN;

-- Default schema
CREATE SCHEMA IF NOT EXISTS discord_chat_test;

SET LOCAL search_path TO discord_chat_test, public;

--
--
-- ************************************
-- Tables
-- ************************************
--
-- ====================================
-- Discord Guild
-- ====================================
CREATE TABLE IF NOT EXISTS "discord_guild"(
  "guild_id" text NOT NULL UNIQUE,
  -- trigger
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("guild_id")
);

--
-- ====================================
-- Discord Channel
-- ====================================
CREATE TABLE IF NOT EXISTS "discord_channel"(
  "channel_id" text NOT NULL UNIQUE,
  -- trigger
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  -- foreign key
  "guild_id" text NOT NULL,
  PRIMARY KEY ("channel_id")
);

--
-- ====================================
-- Discord User
-- ====================================
CREATE TABLE IF NOT EXISTS "discord_user"(
  "user_id" text NOT NULL UNIQUE,
  -- trigger
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("user_id")
);

--
-- ====================================
-- Text-gen Chat
-- ====================================
CREATE TABLE IF NOT EXISTS "chat"(
  "id" uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  --
  "history_internal" text[] NOT NULL DEFAULT '{}',
  "history_visible" text[] NOT NULL DEFAULT '{}',
  "max_new_tokens" integer NOT NULL DEFAULT 250,
  "your_name" text NOT NULL DEFAULT 'You',
  "stop_at_newline" boolean NOT NULL DEFAULT FALSE,
  "chat_generation_attempts" integer NOT NULL DEFAULT 1,
  "seed" integer NOT NULL DEFAULT -1,
  "add_bos_token" boolean NOT NULL DEFAULT TRUE,
  "truncation_length" integer NOT NULL DEFAULT 2048,
  "ban_eos_token" boolean NOT NULL DEFAULT FALSE,
  "skip_special_tokens" boolean NOT NULL DEFAULT TRUE,
  "stopping_strings" text[] NOT NULL DEFAULT '{}',
  -- trigger
  "last_update" timestamp NOT NULL DEFAULT NOW(),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  "total_history_internal_character" integer NOT NULL DEFAULT 0,
  "total_history_visible_character" integer NOT NULL DEFAULT 0,
  -- foreign key
  "channel_id" text NOT NULL,
  "character_id" uuid,
  "preset_id" uuid,
  "setting_id" uuid,
  --
  PRIMARY KEY (id)
);

--
-- ====================================
-- Text-gen Character
-- ====================================
CREATE TABLE IF NOT EXISTS "character"(
  "id" uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  "profile_name" text NOT NULL,
  "context" text NOT NULL,
  --
  -- trigger
  "last_update" timestamp NOT NULL DEFAULT NOW(),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  -- foreign key
  "user_id" text NOT NULL,
  --
  PRIMARY KEY ("id", "profile_name")
);

COMMENT ON TABLE "character" IS 'Text-gen Character';

--
-- ====================================
-- Text-gen Preset
-- ====================================
CREATE TABLE IF NOT EXISTS "preset"(
  "id" uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  "name" text NOT NULL,
  --
  "temperature" numeric(9, 5) NOT NULL DEFAULT 0.32,
  "top_p" numeric(9, 5) NOT NULL DEFAULT 0.01,
  "top_k" integer NOT NULL DEFAULT 44,
  "typical_p" numeric(9, 5) NOT NULL DEFAULT 1,
  "epsilon_cutoff" integer NOT NULL DEFAULT 0,
  "eta_cutoff" integer NOT NULL DEFAULT 0,
  "repetition_penalty" numeric(9, 5) NOT NULL DEFAULT 1.14,
  "repetition_penalty_range" integer NOT NULL DEFAULT 0,
  "encoder_repetition_penalty" numeric(9, 5) NOT NULL DEFAULT 1,
  "no_repeat_ngram_size" integer NOT NULL DEFAULT 0,
  "min_length" integer NOT NULL DEFAULT 0,
  "tfs" numeric(9, 5) NOT NULL DEFAULT 1,
  "top_a" numeric(9, 5) NOT NULL DEFAULT 0,
  "do_sample" boolean NOT NULL DEFAULT TRUE,
  -- trigger
  "last_update" timestamp NOT NULL DEFAULT NOW(),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  -- foreign key
  "user_id" text NOT NULL,
  --
  PRIMARY KEY ("id", "name")
);

CREATE INDEX IF NOT EXISTS "preset_discord_user_id_idx" ON "preset"("user_id");

CREATE INDEX IF NOT EXISTS "preset_name_idx" ON "preset"("name");

--
-- ====================================
-- Text-gen Setting
-- ====================================
CREATE TABLE IF NOT EXISTS "setting"(
  "id" uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
  "name" text NOT NULL,
  "context" text NOT NULL,
  "greeting" text NOT NULL,
  "turn_template" text NOT NULL,
  --
  "dark_theme" boolean NOT NULL DEFAULT FALSE,
  "autoload_model" boolean NOT NULL DEFAULT FALSE,
  "max_new_tokens" integer NOT NULL DEFAULT 200,
  "max_new_tokens_min" integer NOT NULL DEFAULT 0,
  "max_new_tokens_max" integer NOT NULL DEFAULT 2000,
  "seed" boolean NOT NULL DEFAULT FALSE,
  "name1" text NOT NULL DEFAULT 'You',
  "name2" text NOT NULL DEFAULT 'Assistant',
  "custom_stopping_strings" text NOT NULL DEFAULT '{}',
  "stop_at_newline" boolean NOT NULL DEFAULT FALSE,
  "add_bos_token" boolean NOT NULL DEFAULT TRUE,
  "ban_eos_token" boolean NOT NULL DEFAULT FALSE,
  "skip_special_tokens" boolean NOT NULL DEFAULT TRUE,
  "truncation_length" integer NOT NULL DEFAULT 2048,
  "truncation_length_min" integer NOT NULL DEFAULT 0,
  "truncation_length_max" integer NOT NULL DEFAULT 16384,
  "mode" integer NOT NULL DEFAULT 1,
  "chat_generation_attempts_min" integer NOT NULL DEFAULT 1,
  "chat_generation_attempts_max" integer NOT NULL DEFAULT 10,
  "default_extensions" text[] NOT NULL DEFAULT '{}',
  "chat_default_extensions" text[] NOT NULL DEFAULT '{}',
  -- trigger
  "last_update" timestamp NOT NULL DEFAULT NOW(),
  "created_at" timestamp NOT NULL DEFAULT NOW(),
  -- foreign key
  "user_id" text NOT NULL,
  --
  PRIMARY KEY ("id", "name")
);

--
--
-- ************************************
-- constraint definitions
-- ************************************
--
-- ====================================
-- discord_channel
-- ====================================
ALTER TABLE "discord_channel"
  ADD CONSTRAINT "FK_discord_guild_TO_discord_channel" FOREIGN KEY ("guild_id") REFERENCES "discord_guild"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

--
-- ====================================
-- preset
-- ====================================
ALTER TABLE "preset"
  ADD CONSTRAINT "FK_discord_user_TO_preset" FOREIGN KEY ("user_id") REFERENCES "discord_user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

--
-- ====================================
-- character
-- ====================================
ALTER TABLE "character"
  ADD CONSTRAINT "FK_discord_user_TO_character" FOREIGN KEY ("user_id") REFERENCES "discord_user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

--
-- ====================================
-- setting
-- ====================================
ALTER TABLE "setting"
  ADD CONSTRAINT "FK_discord_user_TO_setting" FOREIGN KEY ("user_id") REFERENCES "discord_user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

--
-- ====================================
-- chat
-- ====================================
ALTER TABLE "chat"
  ADD CONSTRAINT "FK_discord_channel_TO_chat" FOREIGN KEY ("channel_id") REFERENCES "discord_channel"("channel_id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "FK_character_TO_chat" FOREIGN KEY ("character_id") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "FK_preset_TO_chat" FOREIGN KEY ("preset_id") REFERENCES "preset"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "FK_setting_TO_chat" FOREIGN KEY ("setting_id") REFERENCES "setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

--
--
-- ************************************
-- Trigger
-- ************************************
--
-- ====================================
-- update last update
-- ====================================
CREATE OR REPLACE FUNCTION update_last_update()
  RETURNS TRIGGER
  AS $$
BEGIN
  NEW."last_update" = NOW();
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

--
CREATE TRIGGER update_character_last_update
  BEFORE UPDATE ON "character"
  FOR EACH ROW
  EXECUTE FUNCTION update_last_update();

CREATE TRIGGER update_chat_last_update
  BEFORE UPDATE ON "chat"
  FOR EACH ROW
  EXECUTE FUNCTION update_last_update();

CREATE TRIGGER update_preset_last_update
  BEFORE UPDATE ON "preset"
  FOR EACH ROW
  EXECUTE FUNCTION update_last_update();

CREATE TRIGGER update_setting_last_update
  BEFORE UPDATE ON "setting"
  FOR EACH ROW
  EXECUTE FUNCTION update_last_update();

--
-- ====================================
-- update total_history_character
-- ====================================
CREATE OR REPLACE FUNCTION update_total_history_character()
  RETURNS TRIGGER
  AS $$
BEGIN
  NEW."total_history_internal_character" = SUM(LENGTH(ARRAY_TO_STRING(NEW."total_history_internal", '')));
  NEW."total_history_visible_character" = SUM(LENGTH(ARRAY_TO_STRING(NEW."total_history_visible", '')));
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

--
CREATE OR REPLACE TRIGGER update_total_history_character
  BEFORE UPDATE ON "chat"
  FOR EACH ROW
  EXECUTE PROCEDURE update_total_history_character();

--
--
COMMIT;

