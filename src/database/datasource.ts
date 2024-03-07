import { DataSource, DataSourceOptions } from 'typeorm';
import { AuthSubscriber } from '../auth/auth.subscribers';

export const dataSourceOptions: DataSourceOptions = {
  type: (process.env.TYPE as any) ?? 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) ?? 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'ravi1234',
  database: process.env.DB_NAME || 'postgres-new',
  synchronize: true,
  bigNumberStrings: true,
  multipleStatements: true,
  logging: true,
  subscribers: [AuthSubscriber],
  entities: ['**/*.entity{ .ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
