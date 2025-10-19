import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'accessJwtConfig',
  (): JwtSignOptions => ({
    secret: process.env.ACCESS_JWT_TOKEN_SECRET,
    expiresIn: process.env
      .ACCESS_JWT_TOKEN_EXPIRE_IN as JwtSignOptions['expiresIn'],
  }),
);
