import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { Image } from './image/entities/image.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mysql@2025',
      database: 'my_db',
      entities: [User,Image],
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