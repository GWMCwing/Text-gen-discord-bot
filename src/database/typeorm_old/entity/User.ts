import { Entity, Column, PrimaryGeneratedColumn, Unique, PrimaryColumn, OneToMany } from 'typeorm';
import Character from './Character';
import Preset from './Preset';
import Setting from './Setting';
import LastUpdate from './abstract/LastUpdate';

@Entity({ name: 'discord_user' })
class DiscordUser extends LastUpdate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @PrimaryColumn({ type: 'text', nullable: false })
  discordUserId!: string;

  @Column({ type: 'text', nullable: false })
  discordUserName!: string;

  @OneToMany(() => Character, (character) => character.discordUser, { onDelete: 'CASCADE' })
  characters!: Character[];
  @OneToMany(() => Preset, (preset) => preset.discordUser, { onDelete: 'CASCADE' })
  presets!: Preset[];
  @OneToMany(() => Setting, (setting) => setting.discordUser, { onDelete: 'CASCADE' })
  settings!: Setting[];

  // @Column({ name: 'last_update', type: 'timestamp with time zone', default: () => 'now()', nullable: false })
  // lastUpdate!: Date;
}

export default DiscordUser;
