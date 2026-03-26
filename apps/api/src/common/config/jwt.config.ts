import { registerAs } from '@nestjs/config';

import type { JwtConfig } from '../types/types';

export default registerAs<JwtConfig>('jwt', () => ({
  accessToken: process.env.JWT_ACCESS_SECRET || '',
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  refreshToken: process.env.JWT_REFRESH_SECRET || '',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
}));
