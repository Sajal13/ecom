'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormSchemaType } from 'lib/schemas/contact';
import Button from 'components/base/Buttons';
import TextField from 'components/base/TextField';
import TextareaField from 'components/base/TextareaField';

const ContactForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormSchemaType) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    reset();
  }, []);
  return (
    <div className="xl:col-span-4 bg-neutral-50 drop-shadow-xl drop-shadow-secondary-500/10 rounded-md px-6 md:px-9 py-8 md:py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 xl:mb-8">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Your Name..."
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Your Email..."
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Your Phone Number..."
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
        </div>
        <div className="mb-8 xl:mb-10">
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextareaField
                {...field}
                rows={8}
                placeholder="Your Message..."
                error={!!errors.message}
                helperText={errors.message?.message}
              />
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="filled" color="primary">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
