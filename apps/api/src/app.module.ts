import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import appConfig from './common/config/app.config';
import argonConfig from './common/config/argon.config';
import dbConfig from './common/config/db.config';
import jwtConfig from './common/config/jwt.config';
import { AppConfig, DbConfig } from './common/types/types';
import { PasswordModule } from './password/password.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    /**Environment configuration */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, argonConfig, dbConfig]
    }),

    /** Postgres Database configuration */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.getOrThrow<DbConfig>('db');
        const appConfig = config.getOrThrow<AppConfig>('app');

        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.userName,
          password: db.password,
          database: db.database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: appConfig.env !== 'development',
          logging: appConfig.env === 'development'
        };
      }
    }),

    /** Rate Limiting */
    /** Applied globally as a guard below; Individual routes can override with */
    /** @Throttler({ default: { ttl: 60000, limit: 5 }}) */

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const appConfig = config.getOrThrow<AppConfig>('app');

        return {
          throttlers: [
            {
              name: 'default',
              ttl: appConfig.throttlerTTL,
              limit: appConfig.throttlerLimit
            }
          ]
        };
      }
    }),

    PasswordModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
