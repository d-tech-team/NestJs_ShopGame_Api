import { Injectable } from '@nestjs/common';
import { signupDTO } from './dto/signup.dto';
import { UserRepository } from 'src/user/user.repository';
import { hash, compare } from 'bcrypt';
import { User } from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) { }


  async signup(signupDTO: signupDTO) {
    const { name, username, password, repassword } = signupDTO

    if (password !== repassword) {
      return {
        success: false,
        data: "Password not match"
      }
    }

    try {
      const user = await this.userRepository.findByUsername(username)
      if (user) {
        return {
          success: false,
          data: "User already exits"
        }
      }

      await this.userRepository.create({
        name,
        username,
        password: await hash(password, 10)
      })

      return {
        success: true,
        data: "Signup successfully"
      }

    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "Bad request"
      }
    }
  }

  async signin(user: any) {
    const { username, _id , role} = user
    const payload = {
      username,
      role,
      sub: _id
    }
    return {
      success: true,
      data: {
        assess_token: this.jwtService.sign(payload)
      }
    }
  }

  async validateUser(username: string, password: string): Promise<User | Boolean> {
    let user = await this.userRepository.findByUsername(username)
    if (!user)
      return false
    const isMatch = await compare(password, user.password)
    if (!isMatch)
      return false
    return user
  }

}
