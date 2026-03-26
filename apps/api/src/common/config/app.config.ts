import { registerAs } from '@nestjs/config';

import type { AppConfig } from '../types/types';

export default registerAs<AppConfig>('app', () => ({
  port: Number(process.env.PORT) || 3001,
  env: process.env.NODE_ENV || 'development',
  throttlerTTL: Number(process.env.THROTTLE_TTL) || 60000,
  throttlerLimit: Number(process.env.THROTTLE_LIMIT) || 100
}));
