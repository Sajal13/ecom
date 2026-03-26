'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Button from 'components/base/Buttons';

const ThemeTogglerButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // only for icon correctness (NOT blocking UI)
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      size="small"
      shape="circle"
      color="secondary"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span className="text-xl">
        {mounted ? (isDark ? <FaMoon /> : <FaSun />) : <FaSun />}
      </span>
    </Button>
  );
};

export default ThemeTogglerButton;