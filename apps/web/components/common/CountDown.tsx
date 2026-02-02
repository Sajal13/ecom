import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';

interface CountDownProps {
  timeDuration?: Duration
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


const CountDown = ({ timeDuration }: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    if(timeDuration) {
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

  return (
    <div className='flex items-center gap-2 md:gap-4 text-center'>
      <div className='px-2 lg:px-4 py-1 lg:py-2 bg-neutral-200 shadow-sm rounded-md md:min-w-22.5'>
        <p className="font-medium text-xs md:text-sm mb-0">Days</p>
        <h3 className='mb-0 text-2xl md:text-3xl lg:text-4xl'>{days}</h3>
      </div>
      <div className='px-2 lg:px-4 py-1 lg:py-2 bg-neutral-200 shadow-sm rounded-md md:min-w-22.5'>
        <p className="font-medium text-xs md:text-sm mb-0">Hours</p>
        <h3 className='mb-0 text-2xl md:text-3xl lg:text-4xl'>{hours}</h3>
      </div>
      <div className='px-2 lg:px-4 py-1 lg:py-2 bg-neutral-200 shadow-sm rounded-md md:min-w-22.5'>
        <p className="font-medium text-xs md:text-sm mb-0">Minutes</p>
        <h3 className='mb-0 text-2xl md:text-3xl lg:text-4xl'>{minutes}</h3>
      </div>
      <div className='px-2 lg:px-4 py-1 lg:py-2 bg-neutral-200 shadow-sm rounded-md md:min-w-22.5'>
        <p className="font-medium text-xs md:text-sm mb-0">Seconds</p>
        <h3 className='mb-0 text-2xl md:text-3xl lg:text-4xl'>{seconds}</h3>
      </div>
    </div>
  );
};

export default CountDown;
