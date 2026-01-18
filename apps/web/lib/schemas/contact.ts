import { BD_PHONE_REGEX } from 'data/common';
import z from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email('Enter a valid email address'),
  phone: z
    .string()
    .refine(
      (value) => BD_PHONE_REGEX.test(value),
      'Enter a valid Bangladeshi phone number',
    ),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;