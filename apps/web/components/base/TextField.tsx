'use client';

import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'filled' | 'outlined';
type Size = 'small' | 'medium' | 'large';

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  const labelBaseClass = 'mb-1 text-sm font-medium text-primary-700';
  const baseClass =
    'block w-full rounded-md focus:outline-none transition-all duration-300 border bg-transparent focus:border-success';

  const sizeClasses: Record<Size, string> = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-12 py-5 text-lg'
  };

  const colorClasses = classNames({
    'border-danger-300 ': error,
    'border-secondary-300': !error
  });

  const variantClasses: Record<Variant, string> = {
    filled: classNames({
      'bg-danger-300 hover:bg-danger-300/80': error,
      'bg-secondary-300 hover:bg-secondary-300/80': !error
    }),
    outlined: 'bg-transparent'
  };

  const labelClass = twMerge(labelBaseClass, labelClassName);

  const inputClass = twMerge(
    baseClass,
    sizeClasses[size],
    colorClasses,
    variantClasses[variant],
    className
  );

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className={labelClass}>
          {label}
        </label>
      )}

      <input className={inputClass} {...rest} />

      {helperText && (
        <span
          className={classNames('text-xs mt-1', {
            'text-danger': error,
            'text-secondary': !error
          })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextField;