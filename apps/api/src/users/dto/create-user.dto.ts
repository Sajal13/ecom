import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  Validate
} from 'class-validator';

import { IsEmailOrPhoneConstraint } from '../validators/email-or-phone.validator';
import { MatchPasswordConstraint } from '../validators/match-password.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsEmailOrPhoneConstraint)
  emailOrPhone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.'
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswordConstraint)
  confirmPassword: string;
}
