import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { UserService } from './../modules/user/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { decodePass } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: {
    id: string;
    name: string;
    email: string;
    company_id: string;
    is_admin: boolean;
  }): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      company_id: user.company_id,
      is_admin: user.is_admin,
    };

    const jwtToken = this.jwtService.sign(payload);

    return { access_token: jwtToken };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.user({ email });
    if (user) {
      const isValidPassword = decodePass(user.password, password);

      if (isValidPassword) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          company_id: user.company_id,
          is_admin: user.is_admin,
        };
      }
    }
    throw new HttpException(
      'Email or password is incorrect',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
