import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<Auth> {
    const { authId, password } = loginDto;
    const userExist = await this.authService.findOne(authId);

    if (!userExist) throw new NotFoundException('User not found.');

    const isPasswordVerified: boolean = bcrypt.compareSync(
      password,
      userExist.password,
    );

    if (!isPasswordVerified)
      throw new UnauthorizedException('Credentials are not correct.');

    return userExist;
  }

  @Post('add-user')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.addUser(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
