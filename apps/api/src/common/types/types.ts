export interface AppConfig {
  port: number;
  env: string;
  throttlerTTL: number;
  throttlerLimit: number;
}

export interface JwtConfig {
  accessToken: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
}

export interface DbConfig {
  host: string;
  port: number;
  userName: string;
  password: string;
  database: string;
}

export interface ArgonConfig {
  memoryCost: number;
  timeCost: number;
  parallelism: number;
}
