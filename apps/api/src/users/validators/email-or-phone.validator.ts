import {
  isEmail,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ name: 'isEmailOrPhone', async: false })
export class IsEmailOrPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: string): Promise<boolean> | boolean {
    if (!value || typeof value !== 'string') return false;

    const BD_PHONE_REGEX = /^(?:\+8801|8801|01)[0-9]{9}$/;

    return isEmail(value.trim()) || BD_PHONE_REGEX.test(value.trim());
  }

  defaultMessage() {
    return 'emailOrPhone must be a valid email or phone number';
  }
}
