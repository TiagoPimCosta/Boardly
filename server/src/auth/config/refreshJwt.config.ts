import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refreshJwtConfig',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_TOKEN_SECRET,
    expiresIn: process.env
      .REFRESH_JWT_TOKEN_EXPIRE_IN as JwtSignOptions['expiresIn'],
  }),
);
