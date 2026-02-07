'use client';

import { PropsWithChildren } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Duration } from 'dayjs/plugin/duration';
import Button, { Color, Shape, Size, Variant } from 'components/base/Buttons';
import CountDown from '../CountDown';

interface ShowCountdown {
  show: boolean;
  shape?: Shape;
  color?: Color;
  size?: Size;
}

interface ProductListProps {
  title: string;
  titleClassName?: string;
  subTitle?: string;
  subTitleClassName?: string;
  showCountdown?: ShowCountdown;
  showButton?: boolean;
  timeDuration?: Duration;
  url?: string;
  buttonText?: string;
  buttonClass?: string;
  variant?: Variant;
  color?: Color;
  size?: Size;
  shape?: Shape;
}

const ProductList = ({
  title,
  titleClassName,
  subTitle,
  subTitleClassName,
  showCountdown,
  showButton = true,
  url = '#!',
  timeDuration,
  buttonText = 'View All',
  buttonClass,
  variant,
  shape,
  size,
  color = 'danger',
  children,
}: PropsWithChildren<ProductListProps>) => {
  return (
    <>
      {subTitle && (
        <div className="flex items-center gap-2.5 mb-2.5 md:mb-3 lg:mb-4">
          <div className="w-5 h-8 bg-primary-500 rounded-md" />
          <p
            className={classNames(
              'font-medium flex-1 text-primary-500',
              subTitleClassName,
            )}
          >
            {subTitle}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end lg:items-center mb-7 md:mb-9 lg:mb-10 gap-6">
        <div
          className={classNames({
            'flex flex-wrap flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 xl:gap-20':
              showCountdown,
          })}
        >
          <h3
            className={classNames(
              'text-2xl md:text-3xl lg:text-4xl',
              titleClassName,
            )}
          >
            {title}
          </h3>
          {showCountdown?.show && (
            <CountDown
              timeDuration={timeDuration}
              shape={showCountdown.shape}
              size={showCountdown.size}
              color={showCountdown.color}
            />
          )}
        </div>
        {showButton && (
          <Link href={url}>
            <Button
              color={color}
              variant={variant}
              shape={shape}
              size={size}
              className={buttonClass}
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
      {children}
    </>
  );
};

export default ProductList;
