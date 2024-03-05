import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    async function createAdminUser() {
      let adminUser = await userRepository
        .findOne({ where: { email: 'admin@admin.com' } });

      if (adminUser) {
        Logger.log('Admin exists avoiding admin creation', 'AppModule');
      } else {
        Logger.log('Admin not found. Creating a new one', 'AppModule');
        userRepository.save({
          name: 'Administrator',
          email: 'admin@admin.com',
          phoneNumber: '9999999999',
        })     
      }
    }

    createAdminUser();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
