import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDTO } from './dto/signup.dto';
import { signinDTO } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  signup(@Body() signupDTO: signupDTO) {
    return this.authService.signup(signupDTO)
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  signin(@Request() req: any) {
    return this.authService.signin(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
