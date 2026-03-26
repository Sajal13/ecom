import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';

import { UserInfo } from 'src/common/types/User';
import { normalizePhone } from 'src/common/utils/normalize-phone';

import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase() }
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { phone: normalizePhone(phone) }
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id }
    });
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const input = emailOrPhone.trim();

    if (isEmail(input)) {
      return this.findByEmail(input);
    }

    return this.findByPhone(input);
  }

  async createUser(data: UserInfo): Promise<User> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }
}
