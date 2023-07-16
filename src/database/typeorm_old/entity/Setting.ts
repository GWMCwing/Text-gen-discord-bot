import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinColumn, OneToMany } from 'typeorm';
import DiscordUser from './User';
import LastUpdate from './abstract/LastUpdate';

@Entity({ name: 'setting' })
@Unique(['name'])
export class Setting extends LastUpdate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  dark_theme!: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  autoload_model!: boolean;

  @Column({ type: 'integer', default: 200, nullable: false })
  max_new_tokens!: number;

  @Column({ type: 'integer', default: 0, nullable: false })
  max_new_tokens_min!: number;

  @Column({ type: 'integer', default: 2000, nullable: false })
  max_new_tokens_max!: number;

  @Column({ type: 'integer', default: -1, nullable: false })
  seed!: number;

  @Column({ type: 'text', default: 'None', nullable: false })
  character!: string;

  @Column({ type: 'text', default: 'You', nullable: false })
  name1!: string;

  @Column({ type: 'text', default: 'Assistant', nullable: false })
  name2!: string;

  @Column({ type: 'text', default: '', nullable: false })
  context!: string;

  @Column({ type: 'text', default: '', nullable: false })
  greeting!: string;

  @Column({ type: 'text', default: '', nullable: false })
  turn_template!: string;

  @Column({ type: 'text', default: '', nullable: false })
  custom_stopping_strings!: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  stop_at_newline!: boolean;

  @Column({ type: 'boolean', default: true, nullable: false })
  add_bos_token!: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  ban_eos_token!: boolean;

  @Column({ type: 'boolean', default: true, nullable: false })
  skip_special_tokens!: boolean;

  @Column({ type: 'integer', default: 2048, nullable: false })
  truncation_length!: number;

  @Column({ type: 'integer', default: 0, nullable: false })
  truncation_length_min!: number;

  @Column({ type: 'integer', default: 16384, nullable: false })
  truncation_length_max!: number;

  @Column({ type: 'text', default: 'chat', nullable: false })
  mode!: string;

  @Column({ type: 'text', default: '', nullable: false })
  start_with!: string;

  @Column({ type: 'text', default: 'cai-chat', nullable: false })
  chat_style!: string;

  @Column({ type: 'text', default: 'None', nullable: false })
  instruction_template!: string;

  @Column({ type: 'text', default: 'Continue the chat dialogue below. Write a single reply for\nthe character "<|character|>".\n\n<|prompt|>', nullable: false })
  'chat-instruct_command': string;

  @Column({ type: 'integer', default: 1, nullable: false })
  chat_generation_attempts!: number;

  @Column({ type: 'integer', default: 1, nullable: false })
  chat_generation_attempts_min!: number;

  @Column({ type: 'integer', default: 10, nullable: false })
  chat_generation_attempts_max!: number;

  @Column({ type: 'text', default: '{}', array: true, nullable: false })
  default_extensions!: string[];

  @Column({ type: 'text', default: '{}', array: true, nullable: false })
  chat_default_extensions!: string[];

  @Column({ type: 'text', default: 'simple-1', nullable: false, comment: 'This column is deprecated, it is only used for defining the api structure.' })
  preset!: string;

  @Column({ type: 'text', default: 'QA', nullable: false })
  prompt!: string;

  @OneToMany(() => DiscordUser, (user) => user.id, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'discord_user_id', referencedColumnName: 'id' })
  discordUser!: DiscordUser;

  // @Column({ name: 'last_update', type: 'timestamp with time zone', default: () => 'now()', nullable: false })
  // lastUpdate!: Date;
}
export default Setting;
