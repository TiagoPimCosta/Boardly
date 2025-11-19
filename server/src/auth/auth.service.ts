import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto, RefreshPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './config/refreshJwt.config';
import type { ConfigType } from '@nestjs/config';
import accessJwtConfig from './config/accessJwt.config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @Inject(accessJwtConfig.KEY)
    private accessTokenConfig: ConfigType<typeof accessJwtConfig>,
  ) {}

  async login(authPayloadDto: AuthPayloadDto) {
    const { email, password } = authPayloadDto;
    const findUser = await this.userService.findOneByEmail(email);

    if (!findUser) return null;

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (isPasswordValid) {
      return this.generateTokens(findUser);
    }
  }

  async refreshToken(refreshPayloadDto: RefreshPayloadDto) {
    const { id } = refreshPayloadDto;
    const findUser = await this.userService.findOneById(id);
    if (!findUser) return null;

    const tokens = this.generateTokens(findUser);

    return {
      id: findUser.id,
      ...tokens,
    };
  }

  private generateTokens(user: User) {
    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(
      tokenPayload,
      this.accessTokenConfig,
    );
    const refreshToken = this.jwtService.sign(
      tokenPayload,
      this.refreshTokenConfig,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
