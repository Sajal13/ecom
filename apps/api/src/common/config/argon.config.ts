import { registerAs } from '@nestjs/config';

import type { ArgonConfig } from '../types/types';

export default registerAs<ArgonConfig>('argon2', () => ({
  memoryCost: Number(process.env.ARGON2_MEMORY) || 65536,
  timeCost: Number(process.env.ARGON2_TIME_COST) || 3,
  parallelism: Number(process.env.ARGON2_PARALLELISM) || 1
}));
