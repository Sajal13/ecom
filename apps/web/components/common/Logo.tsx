'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Logo_Dark from 'assets/images/logo/logo_dark.webp';
import Logo_Light from 'assets/images/logo/logo_light.webp';
import LoadingAnimation from './LoadingAnimation';

const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <Link href="/" aria-label="Home">
      <Image
        src={theme === 'dark' ? Logo_Dark : Logo_Light}
        alt="Logo"
        width={100}
        height={66}
        className="w-25 h-auto"
        priority
      />
    </Link>
  );
};

export default Logo;
