import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Or, Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findUserByEmailOrPhone(findUserDto: FindUserDto) {
    const { email, phoneNumber } = findUserDto;
    const user = await this.userRepository.findOne({
      where: [{ email }, { phoneNumber }],
      select: { email: true, phoneNumber: true },
    });
    return user; 
  }

  findAllPaginated() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
