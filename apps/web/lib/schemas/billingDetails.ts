import { BD_PHONE_REGEX } from 'data/common';
import z from 'zod';

export const base = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters.'),
  lastName: z.string().optional(),
  email: z.email('Enter a valid email address'),
  phone: z
    .string()
    .refine(
      (value) => BD_PHONE_REGEX.test(value),
      'Enter a valid phone number.',
    ),
  address: z.string().min(1, `Address can't be empty.`),
  town: z.string().nonempty('Town is required.'),
  zip: z.string().nonempty('Zip code required.'),
  couponCode: z.string().optional(),
  saveInfo: z.boolean(),
});

export const billingDetailsSchema = z.discriminatedUnion('paymentMethod', [
  base.extend({
    paymentMethod: z.literal('cod'),
  }),

  base.extend({
    paymentMethod: z.literal('card'),
    cardNumber: z.string().min(12, 'Card number must be at least 12 digits.'),
    expiryDate: z
      .string()
      .regex(
        /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
        'Enter a valid expiry date (MM/YY).',
      ),
    cvv: z
      .string()
      .min(3, 'CVV must be at least 3 digits.')
      .max(4, 'CVV must be at most 4 digits.'),
  }),
]);

export type BillingDetailsSchemaType = z.infer<typeof billingDetailsSchema>;
