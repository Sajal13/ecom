'use client';


import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordSchemaType } from 'lib/schemas/auth';
import FloatingInput from 'components/base/FloatingInput';
import Button from 'components/base/Buttons';

const ForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      emailOrPhone: '',
    },
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    console.log(data);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="emailOrPhone"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Email or Phone Number"
            error={!!errors.emailOrPhone}
            helperText={errors.emailOrPhone?.message}
            className="mt-10"
            {...field}
          />
        )}
      />
      <Button type="submit" variant="filled" color="primary" className="w-full mt-10">
        Submit
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
