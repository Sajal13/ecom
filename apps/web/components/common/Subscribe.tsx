'use client';

import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { VscSend } from 'react-icons/vsc';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Button from 'components/base/Buttons';
import TextField from 'components/base/TextField';
import classNames from 'classnames';

interface SubscribeFormData {
  email: string;
}

const subscribeScheme = z.object({
  email: z.email('Email must be a valid email'),
});

const Subscribe = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeScheme),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: SubscribeFormData) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    reset()
  }, [])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative max-w-80">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter your email"
              className={classNames('pe-10 text-white', {
                "border-gray-200" : !errors.email
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Button
          size="small"
          color="secondary"
          type="submit"
          className="absolute right-0 top-1 hover:bg-transparent z-10"
        >
          <VscSend className="text-xl text-gray-200" />
        </Button>
      </div>
    </form>
  );
};

export default Subscribe;
