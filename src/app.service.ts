import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';
import { Roles } from './roles/entities/role.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {
    async function createAdminUser() {
      let adminUser = await userRepository.findOne({
        where: { email: 'admin@admin.com' },
        relations: ['auth', 'auth.role']
      });
      Logger.log({adminUser});

      if (adminUser) {
        Logger.log('Admin exists avoiding admin creation', 'AppModule');
      } else {
        Logger.log('Admin not found. Creating a new one', 'AppModule');
        
        const date: Date = new Date();
        const role: Roles = await rolesRepository.findOne({ where: { value: 'SUPER_ADMIN' } })
        const authId =
          'IM_USER_' +
          date.toISOString().slice(0, 10).split('-').join('') +
          '-' +
          date
            .toISOString()
            .slice(11, 23)
            .split(':')
            .join('')
            .split('.')
            .join('');
        const adminAuthData = await authRepository.save({
          authUserId: authId,
          password: 'password',
          role
        });
        
        const adminUserData = await userRepository.save({
          name: 'Administrator',
          email: 'admin@admin.com',
          phoneNumber: '9999999999',
          auth: adminAuthData
        });

        Logger.log({ ...adminAuthData, adminUserData }, 'AppService')
      }
    }

    setTimeout(() => createAdminUser(), 1000);
    
  }

  getHello(): string {
    return 'Hello World!';
  }
}
