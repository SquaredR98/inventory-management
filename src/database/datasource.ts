import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: " localhost",
  port: 5432,
  username: "postgres",
  password: "ravi1234",
  database: "postgres",
  entities: []
})

export const TypeOrmDS: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "ravi1234",
  database: "postgres-new",
  synchronize: true,
  autoLoadEntities: true
}
