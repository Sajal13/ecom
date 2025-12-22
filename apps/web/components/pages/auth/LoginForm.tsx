'use client';

import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from 'lib/schemas/auth';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';
import FloatingInput from 'components/base/FloatingInput';

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
    reset();
  };
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
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Password"
            type="password"
            className="mt-10"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...field}
          />
        )}
      />
      <div className='mt-4 text-end'>
        <AnimatedLink
          href="/forgot-password"
          className="text-sm text-secondary-900 font-medium"
          color="bg-secondary-900"
          position='right'
        >
          Forgot Password?
        </AnimatedLink>
      </div>
      <Button type="submit" variant="filled" color="primary" className="w-full mt-10">
        Log in
      </Button>
      <p className="text-center mt-8">
        Don't have an account?{' '}
        <AnimatedLink
          href="/signup"
          className="text-secondary-900 ml-2 font-medium"
          color="bg-secondary-900"
        >
          Sign up
        </AnimatedLink>
      </p>
    </form>
  );
};

export default LoginForm;
