import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as argon from 'argon2';

import { ArgonConfig } from 'src/common/types/types';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    const argonConfig = this.configService.getOrThrow<ArgonConfig>('argon2');

    return await argon.hash(password, {
      type: argon.argon2id,
      memoryCost: argonConfig.memoryCost,
      timeCost: argonConfig.timeCost,
      parallelism: argonConfig.parallelism
    });
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return await argon.verify(hash, password);
  }
}
