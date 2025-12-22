'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useOtpTimer, formatTime } from 'hooks/useTimer';
import { resetPasswordSchema, ResetPasswordSchemaType } from 'lib/schemas/auth';
import Button from 'components/base/Buttons';
import FloatingInput from 'components/base/FloatingInput';
import OtpInput from './OtpInput';

const OTP_EXPIRY_TIME = 60;

const ResetPassword = () => {
  const { seconds, isExpired, resetTimer, stopTimer } = useOtpTimer(OTP_EXPIRY_TIME);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      otp: '',
    },
  });

  const onSubmit = (data: ResetPasswordSchemaType) => {
    console.log(data);
    reset();
  };

  const handleResend = async () => {
    // await onResend(); // call API to resend OTP
    resetTimer();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <FloatingInput
            label="New Password"
            type="password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            className="mt-10"
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
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            className="mt-10"
            {...field}
          />
        )}
      />
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <>
            <OtpInput value={field.value} onChange={field.onChange} error={!!errors.otp} />
            {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>}
          </>
        )}
      />
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-secondary-500">
          {isExpired ? 'Didn’t receive the code?' : `Resend in ${formatTime(seconds)}`}
        </span>

        <Button
          onClick={handleResend}
          disabled={!isExpired}
          className={classNames('p-0 hover:bg-transparent text-sm', {
            'text-primary-600 hover:underline': isExpired,
            'text-gray-400 cursor-not-allowed': !isExpired,
          })}
        >
          Resend OTP
        </Button>
      </div>
      <Button type="submit" variant="filled" color="primary" className="w-full mt-10">
        Submit
      </Button>
    </form>
  );
};

export default ResetPassword;
