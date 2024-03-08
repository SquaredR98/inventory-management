import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { User } from '../users/entities/user.entity';
import { Roles } from '../roles/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User, Roles]),
    JwtModule.register({
      global: true,
      secret: 'ThisIsARandomSecretForTestingJwtsdmjfnsdjfosejfldsjnfjebifjshf3r3r9f7wefw8ri3298rehid',
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
