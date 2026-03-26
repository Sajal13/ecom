'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import LogoDark from 'assets/images/logo/logo_dark.webp';
import LogoLight from 'assets/images/logo/logo_light.webp';

const Logo = () => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <Link href="/" aria-label="Home">
      <Image
        src={isDark ? LogoDark : LogoLight}
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