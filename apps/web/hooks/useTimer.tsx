'use client';

import { useEffect, useState } from 'react';

export const useOtpTimer = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  return {
    seconds,
    isExpired: seconds === 0,
    resetTimer,
    stopTimer,
  };
};

export const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
