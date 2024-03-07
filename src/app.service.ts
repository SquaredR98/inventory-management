import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {
    async function createAdminUser() {
      let adminUser = await userRepository
        .findOne({ where: { email: 'admin@admin.com' } });

      if (adminUser) {
        Logger.log('Admin exists avoiding admin creation', 'AppModule');
      } else {
        Logger.log('Admin not found. Creating a new one', 'AppModule');
        const adminUserData = await userRepository.save({
          name: 'Administrator',
          email: 'admin@admin.com',
          phoneNumber: '9999999999',
        }) 
        const adminAuthData = await authRepository.save({
          authId: `IM_USER_${(new Date().toJSON().slice(0,10).split("-").join(""))}`,
          password: 'password',
          user: adminUserData
        })
      }
    }

    createAdminUser();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
