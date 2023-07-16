import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import Character from './entity/Character';
import Preset from './entity/Preset';
import Setting from './entity/Setting';
import Chat from './entity/Chat';
import { LastUpdateSubscriber } from './subscriber/LastUpdate';
import DiscordUser from './entity/User';
import DataBaseLogger from '../../utility/logging/typeormLogger';

// https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md

class Database {
  private dataSource: DataSource;
  constructor(dataSourceOptions: DataSourceOptions) {
    this.dataSource = new DataSource(dataSourceOptions);
  }
  public async connect() {
    await this.dataSource.initialize().catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }
  public async disconnect() {
    await this.dataSource.destroy().catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }
  public query_() {
    return this.dataSource.query;
  }
  public query() {
    return this.dataSource.createQueryBuilder();
  }
}

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  entities: [Character, Chat, Preset, Setting, DiscordUser],
  schema: process.env.NODE_ENV === 'development' ? 'test_discord_chat' : 'discord_chat',
  subscribers: [LastUpdateSubscriber],
  migrations: [],
  applicationName: 'test_discord_chat',
  installExtensions: true,
  uuidExtension: 'uuid-ossp',
  logger: new DataBaseLogger(true),
};

const db = new Database(dataSourceConfig);
export default db;
