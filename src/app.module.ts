import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { Image } from './image/entities/image.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host || '',
      port: Number(process.env.port) || 0,
      username: process.env.username || '',
      password: process.env.password || '',
      database: process.env.database || '',
      entities: [User, Image],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
