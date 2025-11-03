'use client';

import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Variant = 'filled' | 'outlined';
type Size = 'small' | 'medium' | 'large';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: Variant;
  size?: Size;
  error?: boolean;
  helperText?: string;
  className?: string;
  labelClassName?: string;
}

const TextField = ({
  label,
  variant = 'outlined',
  size = 'medium',
  error,
  helperText,
  className,
  labelClassName,
  ...rest
}: TextFieldProps) => {
  const labelClass = twMerge(
    classNames('mb-1 text-sm font-medium', labelClassName),
  );

  const inputClass = twMerge(
    classNames(
      'block w-full rounded-md focus:outline-none transition-all duration-300 border',
      'focus:border-success-300',
      {
        'border-danger-300': error,
      },
      {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-4 text-lg',
      }[size],
      {
        filled: classNames(
          error
            ? 'bg-danger-300 hover:bg-danger-300/80'
            : 'bg-secondary-300 hover:bg-secondary-300/80',
        ),
        outlined: 'bg-transparent',
      }[variant],
      className,
    ),
  );

  const helperClass = classNames('text-xs mt-1', {
    'text-danger-500': error,
    'text-secondary-500': !error,
  });

  return (
    <div className="flex flex-col w-full">
      {label && <label className={labelClass}>{label}</label>}

      <input className={inputClass} {...rest} />

      {helperText && <span className={helperClass}>{helperText}</span>}
    </div>
  );
};

export default TextField;
