import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('signup/admin')
  registerAdmin() {
    return this.authService.registerAdmin();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Get('signout')
  signout() {
    return this.authService.signout();
  }
}
