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
  Ip,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Ip() ip: string): Promise<any> {
    const { authId, password } = loginDto;
    const userExist = await this.authService.findOne(authId);

    if (!userExist) throw new NotFoundException('User not found.');

    const isPasswordVerified: boolean = bcrypt.compareSync(
      password,
      userExist.password,
    );

    if (!isPasswordVerified)
      throw new UnauthorizedException('Credentials are not correct.');

    if (userExist.ipUsed !== ip) {
      await this.authService.updateAuthIpsAndDevice(userExist.id, {
        ipUsed: ip,
      });
      throw new BadRequestException(
        'Your IP changed please approve before login again.',
      );
    }

    const {
      password: fetchedPassword,
      user: { name, email },
      role: { name: roleName, value },
    } = userExist;

    const jwt: string = await this.jwtService.signAsync({
      userId: userExist.uniqueAuthId,
      role: value,
    });

    return { name, email, role: roleName, jwt };
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
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
