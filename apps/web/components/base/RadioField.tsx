'use client';

import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Size = 'small' | 'medium' | 'large';

interface RadioFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label?: string;
  size?: Size;
  error?: boolean;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  rootClassName?: string;
}

const RadioField = ({
  label,
  size = 'medium',
  error,
  helperText,
  className,
  labelClassName,
  rootClassName = 'w-full',
  ...rest
}: RadioFieldProps) => {
  const radioSize = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  }[size];

  const inputClass = twMerge(
    classNames(
      'rounded-full border transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-success-300',
      {
        'border-danger-400 text-danger-500': error,
        'border-[var(--border)] text-success-500': !error,
      },
      radioSize,
      className,
    ),
  );

  const labelClass = classNames(
    'ml-2 text-sm cursor-pointer select-none',
    {
      'text-danger-500': error,
      'text-secondary-700': !error,
    },
    labelClassName,
  );

  const helperClass = classNames('mt-1 text-xs', {
    'text-danger-500': error,
    'text-secondary-500': !error,
  });

  return (
    <div className={classNames('flex flex-col', rootClassName)}>
      <label className="inline-flex items-center cursor-pointer">
        <input type="radio" className={inputClass} {...rest} />
        {label && <span className={labelClass}>{label}</span>}
      </label>

      {helperText && <span className={helperClass}>{helperText}</span>}
    </div>
  );
};

export default RadioField;
