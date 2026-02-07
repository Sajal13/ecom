'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import { twMerge } from 'tailwind-merge';
import { Shape, Size, Color } from 'types/common';

interface CountDownProps {
  timeDuration?: Duration;
  shape?: Shape;
  size?: Size;
  color?: Color;
  rootClass?: string;
  className?: string;
}

dayjs.extend(duration);

const initialDuration = dayjs.duration({
  days: 3,
  hours: 23,
  minutes: 1,
  seconds: 39,
});

const formatTime = (timeLeft: Duration) => {
  if (!timeLeft || timeLeft.asSeconds() <= 0) {
    return { days: 0, hours: '00', minutes: '00', seconds: '00' };
  }
  return {
    days: Math.floor(timeLeft.asDays()),
    hours: String(timeLeft.hours()).padStart(2, '0'),
    minutes: String(timeLeft.minutes()).padStart(2, '0'),
    seconds: String(timeLeft.seconds()).padStart(2, '0'),
  };
};

const CountDown = ({
  timeDuration,
  shape = 'square',
  size = 'medium',
  color = 'neutral',
  rootClass,
  className,
}: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    if (timeDuration) {
      setTimeLeft(timeDuration);
    }
  }, [timeDuration]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.asSeconds() <= 1) {
          clearInterval(intervalId);
          return dayjs.duration(0);
        }
        return dayjs.duration(prevTime.asSeconds() - 1, 'seconds');
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  const colorClass: Record<Color, string> = {
    primary: 'bg-primary-200',
    secondary: 'bg-secondary-200',
    warning: 'bg-warning-200',
    success: 'bg-success-200',
    info: 'bg-info-200',
    danger: 'bg-danger-200',
    neutral: 'bg-neutral-200',
  };

  const sizeClass: Record<Shape, Record<Size, string>> = {
    square: {
      small: 'px-2 md:px-3 py-1.5 md:py-2 rounded-sm md:min-w-17',
      medium: 'px-2 md:px-4 py-2 md:py-3 rounded-md md:min-w-22',
      large: 'px-2 md:px-6 py-3 md:py-4 rounded-lg md:min-w-27',
    },
    circle: {
      small:
        'p-2 min-w-16 min-h-16 md:min-w-20 md:min-h-20 rounded-full flex flex-col justify-center items-center',
      medium:
        'p-2 min-h-16 min-w-16 md:min-h-22 md:min-w-22 rounded-full flex flex-col justify-center items-center',
      large:
        'p-2 min-h-16 min-w-16 md:min-h-27 md:min-w-27 rounded-full flex flex-col justify-center items-center',
    },
  };

  const countdownClass = twMerge(
    'shadow-sm',
    colorClass[color],
    sizeClass[shape][size],
    className,
  );

  return (
    <div
      className={classNames(
        'flex items-center gap-2 md:gap-4 text-center',
        rootClass,
      )}
    >
      <div className={countdownClass}>
        <p className="font-medium text-xs md:text-sm mb-0">Days</p>
        <h3 className="mb-0 text-2xl md:text-3xl lg:text-4xl leading-none">
          {days}
        </h3>
      </div>
      <div className={countdownClass}>
        <p className="font-medium text-xs md:text-sm mb-0">Hours</p>
        <h3 className="mb-0 text-2xl md:text-3xl lg:text-4xl leading-none">
          {hours}
        </h3>
      </div>
      <div className={countdownClass}>
        <p className="font-medium text-xs md:text-sm mb-0">Minutes</p>
        <h3 className="mb-0 text-2xl md:text-3xl lg:text-4xl leading-none">
          {minutes}
        </h3>
      </div>
      <div className={countdownClass}>
        <p className="font-medium text-xs md:text-sm mb-0">Seconds</p>
        <h3 className="mb-0 text-2xl md:text-3xl lg:text-4xl leading-none">
          {seconds}
        </h3>
      </div>
    </div>
  );
};

export default CountDown;
