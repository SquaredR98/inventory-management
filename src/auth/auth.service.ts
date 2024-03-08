import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addUser(createAuthDto: CreateAuthDto) {
    const { name, email, phoneNumber, password } = createAuthDto;
    let savedAuthData: Auth, savedUserData: User;
    const date: Date = new Date();
    const authId =
      'IM_USER_' +
      date.toISOString().slice(0, 10).split('-').join('') +
      '-' +
      date.toISOString().slice(11, 23).split(':').join('').split('.').join('');
    const dataToBeSavedInAuth: Auth = {
      authUserId: authId,
      password,
    } as Auth;

    const dataToBeSavedInUser: User = {
      name,
      email,
      phoneNumber,
    } as User;

    savedUserData = await this.userRepository.save(dataToBeSavedInUser);

    if (savedUserData) {
      savedAuthData = await this.authRepository.save({
        ...dataToBeSavedInAuth,
        userId: savedUserData.id,
      });
    }

    return { ...savedUserData, ...savedAuthData };
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: string) {
    return await this.authRepository.findOne({ where: { authUserId: id } });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
