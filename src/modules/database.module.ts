import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const ssl: object | boolean =
          process.env.NODE_ENV === 'production'
            ? {
                rejectUnauthorized: false,
              }
            : false;

        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: process.env.NODE_ENV !== 'production',
          ssl,
          entities: [],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
