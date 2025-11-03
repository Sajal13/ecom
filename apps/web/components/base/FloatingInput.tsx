'use client';

import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Size = 'small' | 'medium' | 'large';

interface FloatingInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: Size;
  error?: boolean;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
}

const FloatingInput = ({
  label,
  size = 'medium',
  error,
  helperText,
  className,
  labelClassName,
  placeholder,
  ...rest
}: FloatingInputProps) => {
  const inputClass = twMerge(
    classNames(
      'peer block w-full border-b-1 bg-transparent focus:outline-none transition-all duration-300',
      {
        'border-danger-500 focus:border-danger-500': error,
        'border-neutral-300 focus:border-success-300': !error,
      },
      {
        small: 'pe-3 pt-1.5 pb-1 text-sm',
        medium: 'pe-8 pt-3 pb-1 text-base',
        large: 'pe-12 pt-5 pb-2 text-lg',
      }[size],
      className,
    ),
  );

  const labelClass = twMerge(
    classNames(
      'absolute left-0 pointer-events-none transition-all duration-200 ease-in-out',
      'peer-focus:-top-1 peer-focus:text-xs',
      'peer-[&:not(:placeholder-shown)]:-top-1 peer-[&:not(:placeholder-shown)]:text-xs',
      {
        small: 'top-3 text-sm peer-placeholder-shown:text-base',
        medium: 'top-3 text-sm peer-placeholder-shown:text-base',
        large: 'top-4 text-base peer-placeholder-shown:text-lg',
      }[size],
      labelClassName,
    ),
  );

  return (
    <div className="relative w-full">
      <input placeholder=" " className={inputClass} {...rest} />

      <label className={labelClass}>{label}</label>

      {helperText && (
        <span
          className={classNames('text-xs mt-1 block', {
            'text-danger-500': error,
            'text-secondary-500': !error,
          })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default FloatingInput;
