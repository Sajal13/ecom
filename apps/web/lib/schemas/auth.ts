import { z } from 'zod';

const bdPhoneRegex = /^(?:\+8801|8801|01)[0-9]{9}$/;

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    emailOrPhone: z
      .string()
      .refine(
        (value) => z.string().email().safeParse(value).success || bdPhoneRegex.test(value),
        'Enter a valid email or Bangladeshi phone number',
      ),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .refine(
      (value) => z.string().email().safeParse(value).success || bdPhoneRegex.test(value),
      'Enter a valid email or Bangladeshi phone number',
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  emailOrPhone: z
    .string()
    .refine(
      (value) => z.string().email().safeParse(value).success || bdPhoneRegex.test(value),
      'Enter a valid email or Bangladeshi phone number',
    ),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    otp: z.string().length(4, 'OTP must be 4 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;