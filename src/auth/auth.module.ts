import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStratery } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/Jwt.strategy';

const { JWT_SECRET } = process.env


@Module({
  imports: [UserModule, PassportModule,JwtModule.register({
    secret: 'lctiendat',
    signOptions: { expiresIn: '30s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStratery ,JwtStrategy]
})
export class AuthModule { }
