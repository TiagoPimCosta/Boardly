import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
  })
  password?: string;
}
