'use client';

import React, { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
type Variant = 'filled' | 'outlined' | 'text';
type Size = 'small' | 'medium' | 'large';
type Type = 'button' | 'submit' | 'reset';
type Shape = 'square' | 'circle';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: Color;
  variant?: Variant;
  size?: Size;
  type?: Type;
  className?: string;
  shape?: Shape;
}

const Button = ({
  startIcon,
  endIcon,
  color = 'neutral',
  variant = 'text',
  size = 'medium',
  type = 'button',
  shape,
  className,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {

  const baseClass = `flex items-center justify-center font-medium 
    focus:outline-none transition-all border duration-200 cursor-pointer`;

  const sizeClasses: Record<Size, string> = {
    small: 'px-3 py-1.5 text-sm rounded-sm',
    medium: 'px-12 py-4 text-base rounded-md',
    large: 'px-5 py-2.5 text-lg rounded-lg',
  };

  const shapeClasses: Record<Shape, Record<Size, string>> = {
    square: {
      small: 'p-2 text-sm rounded-sm',
      medium: 'p-3 text-base rounded-md',
      large: 'p-4 text-lg rounded-lg',
    },
    circle: {
      small: 'w-9 h-9 text-sm rounded-full',
      medium: 'w-11 h-11 text-base rounded-full',
      large: 'w-12 h-12 text-lg rounded-full',
    },
  };
  
  const variantClasses: Record<Color | 'neutral', Record<Variant, string>> = {
    primary: {
      filled:
        'bg-primary-300 text-white border border-primary-300 hover:bg-primary-500 hover:border-primary-500',
      outlined: 'border border-primary-300 text-primary-300 hover:bg-primary-300 hover:text-white',
      text: 'border-0 bg-transparent text-primary-500 hover:bg-primary-50',
    },
    secondary: {
      filled:
        'bg-secondary-300 text-white border border-secondary-300 hover:bg-secondary-500 hover:border-secondary-500',
      outlined:
        'border border-secondary-300 text-secondary-300 hover:bg-secondary-300 hover:text-white',
      text: 'border-0 bg-transparent text-secondary-500 hover:bg-secondary-50',
    },
    success: {
      filled:
        'bg-success-300 text-white border border-success-300 hover:bg-success-500 hover:border-success-500',
      outlined: 'border border-success-300 text-success-300 hover:bg-success-300 hover:text-white',
      text: 'border-0 bg-transparent text-success-500 hover:bg-success-50',
    },
    warning: {
      filled:
        'bg-warning-300 text-white border border-warning-300 hover:bg-warning-500 hover:border-warning-500',
      outlined: 'border border-warning-300 text-warning-300 hover:bg-warning-300 hover:text-white',
      text: 'border-0 bg-transparent text-warning-500 hover:bg-warning-50',
    },
    danger: {
      filled:
        'bg-danger-300 text-white border border-danger-300 hover:bg-danger-500 hover:border-danger-500',
      outlined: 'border border-danger-300 text-danger-300 hover:bg-danger-300 hover:text-white',
      text: 'border-0 bg-transparent text-danger-500 hover:bg-danger-50',
    },
    neutral: {
      filled:
        'bg-neutral-300 text-white border border-neutral-300 hover:bg-neutral-500 hover:border-neutral-500',
      outlined: 'border border-neutral-300 text-neutral-300 hover:bg-neutral-300 hover:text-white',
      text: 'border-0 bg-transparent text-info-600 hover:bg-info-50',
    },
  };

  const baseSizeClass = shape ? shapeClasses[shape][size] : sizeClasses[size];
  const buttonClass = twMerge(baseClass, baseSizeClass, variantClasses[color][variant], className);
  return (
    <button type={type} className={buttonClass} {...rest}>
      {React.isValidElement(startIcon)
        ? React.cloneElement(startIcon as ReactElement<any>, {
            className: classNames((startIcon as ReactElement<any>).props?.className, 'me-2'),
          })
        : startIcon}

      {children}

      {React.isValidElement(endIcon)
        ? React.cloneElement(endIcon as ReactElement<any>, {
            className: classNames((endIcon as ReactElement<any>).props?.className, 'ms-2'),
          })
        : endIcon}
    </button>
  );
};

export default Button;
