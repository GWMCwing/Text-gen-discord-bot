import { Column, Entity } from 'typeorm';

abstract class LastUpdate {
  @Column({ name: 'last_update', type: 'timestamp with time zone', default: () => 'now()', nullable: false })
  lastUpdate!: Date;
}

export default LastUpdate;
