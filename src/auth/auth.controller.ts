import { Controller, Post, Request, UseGuards,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  
  @Post('register')
  async register(@Body() users: User) {
    console.log('Received user data:', users);
    return this.authService.register(users);
  }

}