import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import accessJwtConfig from '../config/accessJwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(accessJwtConfig.KEY)
    private accessJwtConfiguration: ConfigType<typeof accessJwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessJwtConfiguration.secret!,
    });
  }

  validate(payload: any): any {
    return payload;
  }
}
