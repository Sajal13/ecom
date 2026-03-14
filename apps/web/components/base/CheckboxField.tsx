'use client';

import React, { forwardRef, InputHTMLAttributes, Ref } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Size = 'small' | 'medium' | 'large';

interface CheckboxFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'value'
> {
  label?: string;
  size?: Size;
  error?: boolean;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  rootClassName?: string;
  checked?: boolean;
  ref?: Ref<HTMLInputElement>;
}

const CheckboxField = ({
  label,
  size = 'medium',
  error,
  helperText,
  className,
  labelClassName,
  rootClassName = 'w-full',
  checked,
  ref,
  ...rest
}: CheckboxFieldProps) => {
  const checkboxSize = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  }[size];

  const inputClass = twMerge(
    classNames(
      'checked:border-primary-500 checked:bg-no-repeat',
      ' border transition-all duration-200 rounded-md',
      'focus:outline-none  checked:border-primary-500 focus:ring-2 focus:ring-offset-0 focus:ring-primary-300',
      {
        'border-danger-400 text-danger-500': error,
        'border-[var(--border)]': !error,
      },
      checkboxSize,
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
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          className={inputClass}
          {...rest}
        />
        {label && <span className={labelClass}>{label}</span>}
      </label>

      {helperText && <span className={helperClass}>{helperText}</span>}
    </div>
  );
};

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
