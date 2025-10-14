import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto, RefreshPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refreshJwt.config';
import type { ConfigType } from '@nestjs/config';
import accessJwtConfig from './config/accessJwt.config';

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
  constructor(
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(accessJwtConfig.KEY)
    private accessTokenConfig: ConfigType<typeof accessJwtConfig>,
  ) {}

  login(authPayloadDto: AuthPayloadDto) {
    const { username, password } = authPayloadDto;
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser) return null;

    if (password === findUser.password) {
      const { id, username } = findUser;
      const user = { id, username };

      const accessToken = this.jwtService.sign(user, this.accessTokenConfig);
      const refreshToken = this.jwtService.sign(user, this.refreshTokenConfig);

      return {
        id: user.id,
        accessToken,
        refreshToken,
      };
    }
  }

  refreshToken(refreshPayloadDto: RefreshPayloadDto) {
    const { id } = refreshPayloadDto;
    const findUser = fakeUsers.find((user) => user.id === id);
    if (!findUser) return null;

    const { username } = findUser;
    const user = { id, username };

    const accessToken = this.jwtService.sign(user, this.accessTokenConfig);
    const refreshToken = this.jwtService.sign(user, this.refreshTokenConfig);

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }
}
