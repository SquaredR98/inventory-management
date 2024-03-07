import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name, description } = createRoleDto;
    try {
      await this.rolesRepository.save({
        name,
        description,
        value: name.toLowerCase(),
      });

      return 'Role Added Successfully';
    } catch (error) {
      throw error;
    }
  }

  async findRoleByName(name: string) {
    return await this.rolesRepository.findOne({ where: { name } });
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
