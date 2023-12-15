import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/configType';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      url = null,
      type = 'postgres',
      host = 'localhost',
      port = 5432,
      username = null,
      password = null,
      synchronize = false,
      maxConnections = 10,
      sslEnabled = false,
      rejectUnauthorized = false,
      ca = null,
      key = null,
      cert = null,
      name = 'test-db'
    } = this.configService.get('database', { infer: true });

    return {
      type,
      url,
      host,
      port,
      username,
      password,
      database: name,
      synchronize,
      dropSchema: false,
      keepConnectionAlive: true,
      logging:
        this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        max: maxConnections,
        ssl: sslEnabled
          ? {
            rejectUnauthorized: this.configService.get('database', {
              infer: true,
            }),
            ca: ca ?? undefined,
            key: key ?? undefined,
            cert: cert ?? undefined,
          }
          : false,
      },
    } as TypeOrmModuleOptions;
  }
}
