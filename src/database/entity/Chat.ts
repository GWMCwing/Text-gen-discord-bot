import { Column, Entity, Generated, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import Preset from './Preset';
import Character from './Character';
import Setting from './Setting';
import DiscordUser from './User';
import LastUpdate from './abstract/LastUpdate';

@Entity({ name: 'chat' })
export class Chat extends LastUpdate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'history_internal', type: 'text', array: true, default: '{}', nullable: false })
  historyInternal!: string[];

  @Column({ name: 'history_visible', type: 'text', array: true, default: '{}', nullable: false })
  historyVisible!: string[];

  // ========
  // settings
  // ========

  @Column({ name: 'max_new_tokens', type: 'integer', default: 250, nullable: false })
  maxNewTokens!: number;

  @Column({ name: 'your_name', type: 'text', default: 'You', nullable: false })
  yourName!: string;

  @Column({ name: 'stop_at_newline', type: 'boolean', default: false, nullable: false })
  stopAtNewline!: boolean;

  @Column({ name: 'chat_generation_attempts', type: 'integer', default: 1, nullable: false })
  chatGenerationAttempts!: number;

  @Column({ type: 'integer', default: -1, nullable: false })
  seed!: number;

  @Column({ name: 'add_bos_token', type: 'boolean', default: true, nullable: false })
  addBosToken!: boolean;

  @Column({ name: 'truncation_length', type: 'integer', default: 2048, nullable: false })
  truncationLength!: number;

  @Column({ name: 'ban_eos_token', type: 'boolean', default: false, nullable: false })
  banEosToken!: boolean;

  @Column({ name: 'skip_special_tokens', type: 'boolean', default: true, nullable: false })
  skipSpecialTokens!: boolean;

  @Column({ name: 'stopping_strings', type: 'text', array: true, default: '{}', nullable: false })
  stoppingStrings!: string[];

  // =======
  // discord
  // =======

  @Column({ name: 'discord_channel_id', type: 'text', nullable: true })
  discordChannelId!: string | null;

  @Column({ name: 'discord_guild_id', type: 'text', nullable: true })
  discordGuildId!: string | null;

  @OneToMany(() => DiscordUser, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'discord_user_id', referencedColumnName: 'id' })
  discordUser!: DiscordUser;

  // ========
  // triggers
  // ========

  // @Column({ name: 'last_update', type: 'timestamp with time zone', default: () => 'now()', nullable: false })
  // lastUpdate!: Date;

  @Column({ name: 'total_history_internal_character', type: 'integer', default: 0, nullable: false })
  totalHistoryInternalCharacter!: number;

  @Column({ name: 'total_history_visible_character', type: 'integer', default: 0, nullable: false })
  totalHistoryVisibleCharacter!: number;

  // ============
  // foreign keys
  // ============

  @OneToOne(() => Preset, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'preset_id', referencedColumnName: 'id' })
  preset!: Preset | null;

  @OneToOne(() => Character, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'character_id', referencedColumnName: 'id' })
  character!: Character | null;

  @OneToOne(() => Setting, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'setting_id', referencedColumnName: 'id' })
  setting!: Setting | null;

  // ========
  // Triggers
  // ========

  @BeforeUpdate()
  updateTotalHistoryInternalCharacter() {
    this.totalHistoryInternalCharacter = this.historyInternal.join('').length;
  }

  @BeforeUpdate()
  updateTotalHistoryVisibleCharacter() {
    this.totalHistoryVisibleCharacter = this.historyVisible.join('').length;
  }
}

export default Chat;
