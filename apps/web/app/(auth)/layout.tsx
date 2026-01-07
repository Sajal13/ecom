import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Background1 from 'assets/images/background/auth.webp';
import Button from 'components/base/Buttons';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
      <section className="w-full hidden md:block">
        <Image
          src={Background1}
          alt="background image"
          className="w-full h-full object-cover"
          priority
        />
      </section>
      <section className="flex items-center justify-center">{children}</section>
      <Link href="/" className="fixed top-6 right-6">
        <Button variant="filled" color="primary" size='small'>Back to Home</Button>
      </Link>
    </main>
  );
};

export default Layout;
