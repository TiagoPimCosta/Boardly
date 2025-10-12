import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'Tiago',
    password: 'Tiago',
  },
  {
    id: 2,
    username: 'Jack',
    password: 'password',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(authPayloadDto: AuthPayloadDto) {
    const { username, password } = authPayloadDto;
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser) return null;

    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
