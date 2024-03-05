import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDS } from './database/datasource';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmDS),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    LoggerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
