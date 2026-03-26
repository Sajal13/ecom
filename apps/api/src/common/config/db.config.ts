import { registerAs } from '@nestjs/config';

import type { DbConfig } from '../types/types';

export default registerAs<DbConfig>('db', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  userName: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecom'
}));
