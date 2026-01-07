'use client';

import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchemaType } from 'lib/schemas/auth';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';
import FloatingInput from 'components/base/FloatingInput';

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      emailOrPhone: '',
      password: '',
      confirmPassword: ''
    },
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...field}
          />
        )}
      />
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
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="Confirm Password"
            type="password"
            className="mt-10"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="filled" color="primary" className="w-full mt-10">
        Create Account
      </Button>
      <p className='text-center mt-8'>
        Already have an account?{' '}
        <AnimatedLink
          href="/login"
          className="text-secondary-900 ml-3"
          color="bg-secondary-900"
        >
          Log in
        </AnimatedLink>
      </p>
    </form>
  );
};

export default SignupForm;
