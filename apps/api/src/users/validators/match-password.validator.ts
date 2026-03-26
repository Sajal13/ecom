import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { CreateUserDto } from '../dto/create-user.dto';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(
    confirmPassword: string,
    args: ValidationArguments
  ): Promise<boolean> | boolean {
    const object = args.object as CreateUserDto;

    return object.password === confirmPassword;
  }

  defaultMessage(): string {
    return 'Confirm password does not match password';
  }
}
