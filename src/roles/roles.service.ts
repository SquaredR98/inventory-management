import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
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
  ) {
    async function createSuperAdminRole() {
      const roleExists = await rolesRepository.findOne({
        where: { value: 'SUPER_ADMIN' },
      });

      if (roleExists) {
        Logger.log('Role exists so avoiding creating role.', 'RolesService');
        return;
      }

      Logger.log('Role do not exist so creating role.', 'RolesService');
      await rolesRepository.save({
        name: 'Super Admin',
        value: 'SUPER_ADMIN',
        description:
          'This role is for the super admin. In this case the developer so that a new Admin can be created. And can only be used for the development purposes.',
      });
    }

    createSuperAdminRole();
  }

  async create(createRoleDto: CreateRoleDto, ip: string): Promise<Roles> {
    const { name, description } = createRoleDto;
    try {
      const response = await this.rolesRepository.save({
        name,
        description,
        value: name.split(' ').join('_').toUpperCase(),
        ipUsed: ip,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findRoleByName(name: string) {
    return await this.rolesRepository.findOne({ where: { name } });
  }

  async findAll() {
    return await this.rolesRepository.find({
      select: ['name', 'description', 'value', 'updatedAt', 'createdAt'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return this.rolesRepository.delete(id);
  }
}
