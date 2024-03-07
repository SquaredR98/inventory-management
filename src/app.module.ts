import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/datasource';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, Auth]),
    UsersModule,
    LoggerModule,
    AuthModule,
    PermissionsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
