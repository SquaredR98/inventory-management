import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { User } from '../users/entities/user.entity';
import { Roles } from '../roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User, Roles])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
