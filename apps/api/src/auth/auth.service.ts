import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { isEmail } from 'class-validator';

import { normalizePhone } from 'src/common/utils/normalize-phone';
import { PasswordService } from 'src/password/password.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { name, emailOrPhone, password } = createUserDto;

    const input = emailOrPhone.trim();
    const isUserEmail = isEmail(input);

    const email = isUserEmail ? input.toLowerCase() : null;
    const phone = isUserEmail ? null : normalizePhone(input);

    const existingUser = await this.userService.findByEmailOrPhone(input);

    if (existingUser) {
      throw new BadRequestException('User already Exist');
    }

    const hashedPassword = await this.passwordService.hash(password);

    const user = await this.userService.createUser({
      name,
      email,
      phone,
      password: hashedPassword
    });
    return this.generateAuthResponse(user);
  }

  registerAdmin() {
    return `Hello from register admin`;
  }

  login() {
    return `login`;
  }

  signout() {
    return `signout`;
  }

  private async generateAuthResponse(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      phone: user.phone
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Authentication successful',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt
      }
    };
  }
}
