import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeUpdate, JoinColumn, OneToMany } from 'typeorm';
import DiscordUser from './User';
import LastUpdate from './abstract/LastUpdate';

@Entity({ name: 'preset' })
@Unique(['name'])
export class Preset extends LastUpdate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'numeric', precision: 9, scale: 5, nullable: true })
  temperature!: number | null;

  @Column({ name: 'top_p', type: 'numeric', precision: 9, scale: 5, nullable: true })
  topP!: number | null;

  @Column({ name: 'top_k', type: 'integer', nullable: true })
  topK!: number | null;

  @Column({ name: 'typical_p', type: 'numeric', precision: 9, scale: 5, nullable: true })
  typicalP!: number | null;

  @Column({ name: 'epsilon_cutoff', type: 'integer', nullable: true })
  epsilonCutoff!: number | null;

  @Column({ name: 'eta_cutoff', type: 'integer', nullable: true })
  etaCutoff!: number | null;

  @Column({ name: 'repetition_penalty', type: 'numeric', precision: 9, scale: 5, nullable: true })
  repetitionPenalty!: number | null;

  @Column({ name: 'repetition_penalty_range', type: 'integer', nullable: true })
  repetitionPenaltyRange!: number | null;

  @Column({ name: 'encoder_repetition_penalty', type: 'numeric', precision: 9, scale: 5, nullable: true })
  encoderRepetitionPenalty!: number | null;

  @Column({ name: 'no_repeat_ngram_size', type: 'integer', nullable: true })
  noRepeatNgramSize!: number | null;

  @Column({ name: 'min_length', type: 'integer', nullable: true })
  minLength!: number | null;

  @Column({ name: 'tfs', type: 'numeric', precision: 9, scale: 5, nullable: true })
  tfs!: number | null;

  @Column({ name: 'top_a', type: 'numeric', precision: 9, scale: 5, nullable: true })
  topA!: number | null;

  @Column({ name: 'do_sample', type: 'boolean', nullable: true })
  doSample!: boolean | null;

  @OneToMany(() => DiscordUser, (user) => user.id, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'discord_user_id', referencedColumnName: 'id' })
  discordUser!: DiscordUser;
}

export default Preset;
