import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { databaseConfig } from './config/config.database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(databaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
