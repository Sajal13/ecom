'use client';

import React, { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Variant = 'filled' | 'outlined';
type Size = 'small' | 'medium' | 'large';

interface TextareaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  variant?: Variant;
  size?: Size;
  error?: boolean;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  rootClassName?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextareaField = ({
  label,
  variant = 'outlined',
  size = 'medium',
  error,
  helperText,
  className,
  labelClassName,
  rootClassName = 'w-full',
  ref,
  ...rest
}: TextareaFieldProps) => {
  const labelClass = twMerge(
    classNames(
      'absolute left-3 -top-2.5 bg-white px-1 text-xs font-medium pointer-events-none transition-all',
      {
        'text-danger-500': error,
        'text-secondary-600': !error,
      },
      labelClassName,
    ),
  );

  const textareaClass = twMerge(
    classNames(
      'block w-full rounded-md resize-none transition-all duration-300 focus:outline-none border border-[var(--border)]',
      'focus:border-success-300',
      {
        'border-danger-300': error,
      },
      {
        small: 'px-3 py-2 text-sm min-h-[80px]',
        medium: 'px-4 py-3 text-base min-h-[120px]',
        large: 'px-6 py-4 text-lg min-h-[160px]',
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

  const helperClass = classNames('mt-1 text-xs', {
    'text-danger-500': error,
    'text-secondary-500': !error,
  });

  return (
    <div className={classNames('relative flex flex-col', rootClassName)}>
      {label && <label className={labelClass}>{label}</label>}

      <textarea ref={ref} className={textareaClass} {...rest} />

      {helperText && <span className={helperClass}>{helperText}</span>}
    </div>
  );
};

export default TextareaField;
