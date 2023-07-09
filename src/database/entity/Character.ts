import { AfterRemove, Column, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, getConnection, getManager, getRepository } from 'typeorm';
import DiscordUser from './User';
import LastUpdate from './abstract/LastUpdate';

@Entity({ name: 'character' })
class Character extends LastUpdate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ type: 'text', default: '', nullable: false })
  name!: string;

  @Column({ type: 'text', default: '', nullable: false })
  context!: string;

  @Column({ type: 'text', default: '', nullable: false })
  greeting!: string;

  @Column({ name: 'example_dialogue', type: 'text', default: '', nullable: false })
  exampleDialogue!: string;

  @OneToMany(() => DiscordUser, (user) => user.id, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'discord_user_id', referencedColumnName: 'id' })
  discordUser!: DiscordUser;
}

export default Character;
