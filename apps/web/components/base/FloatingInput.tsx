'use client';

import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Size = 'small' | 'medium' | 'large';

interface FloatingInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: Size;
  error?: boolean;
  helperText?: string;
  className?: string;
  labelClassName?: string;
}

const FloatingInput = ({
  label,
  size = 'medium',
  error,
  helperText,
  className,
  labelClassName,
  ...rest
}: FloatingInputProps) => {
  // Label styling
  const labelBaseClass =
    'absolute left-3 text-primary-500 pointer-events-none transition-all duration-200 ease-in-out';

  const labelSizeClasses: Record<Size, string> = {
    small: 'text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-xs',
    medium: 'text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-xs',
    large: 'text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-focus:-top-1 peer-focus:text-sm',
  };

  // Input base styling
  const baseClass =
    'peer block w-full border-b bg-transparent focus:outline-none transition-all duration-300';

  const sizeClasses: Record<Size, string> = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-8 py-3 text-base',
    large: 'px-12 py-5 text-lg',
  };

  const colorClasses = classNames({
    'border-danger-300 focus:border-danger-300': error,
    'border-secondary-300 focus:border-primary-300': !error,
  });

  // Merge classes
  const inputClass = twMerge(baseClass, sizeClasses[size], colorClasses, className);
  const labelClass = twMerge(labelBaseClass, labelSizeClasses[size], labelClassName);

  return (
    <div className="relative w-full">
      <input placeholder=" " className={inputClass} {...rest} />
      <label className={labelClass}>{label}</label>
      {helperText && (
        <span
          className={classNames('text-xs mt-1', {
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
