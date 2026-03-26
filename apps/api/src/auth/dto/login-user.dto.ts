import { IsNotEmpty, IsString, Validate } from 'class-validator';

import { IsEmailOrPhoneConstraint } from 'src/users/validators/email-or-phone.validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsEmailOrPhoneConstraint)
  emailOrPhone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
