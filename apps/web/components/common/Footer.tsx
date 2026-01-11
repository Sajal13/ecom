import { BsTelephone } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';
import AnimatedLink from 'components/base/AnimateLink';
import Logo from './Logo';
import Subscribe from './Subscribe';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 dark:bg-[#1c1c1c] px-6 py-6 md:py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          <div className='xl:col-span-2'>
            <div className="mb-6">
              <Logo />
            </div>
            <h6 className="mb-6 text-white">Subscribe</h6>
            <p className="font-medium mb-3 text-white">
              Get 10% off your first order
            </p>
            <Subscribe />
          </div>
          <div>
            <h6 className="text-white mb-6">Support</h6>
            <p className="mb-4 text-white">
              Middle Badda, Dhaka, <br /> Dhaka 1212, Bangladesh
            </p>
            <div className="flex items-center gap-2 mb-4">
              <FiMail className="text-white text-xl" />
              <AnimatedLink
                href="mailto:abcd@gmail.com"
                className="text-white font-normal"
                color="bg-white"
              >
                abcd@gmail.com
              </AnimatedLink>
            </div>
            <div className="flex gap-2 items-center">
              <BsTelephone className="text-white text-xl" />
              <AnimatedLink
                href="tel:+880123455677"
                className="text-white font-normal"
                color="bg-white"
              >
                +880123455677
              </AnimatedLink>
            </div>
          </div>
          <div>
            <h6 className="text-white mb-6">Account</h6>
            <div className="mb-4">
              <AnimatedLink
                href="/profile"
                className="text-white font-normal"
                color="bg-white"
              >
                My Account
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/login"
                className="text-white font-normal"
                color="bg-white"
              >
                Login
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/signup"
                className="text-white font-normal"
                color="bg-white"
              >
                Register
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/cart"
                className="text-white font-normal"
                color="bg-white"
              >
                Cart
              </AnimatedLink>
            </div>
            <div className="">
              <AnimatedLink
                href="/wishlist"
                className="text-white font-normal"
                color="bg-white"
              >
                Wishlist
              </AnimatedLink>
            </div>
          </div>
          <div>
            <h6 className="text-white mb-6">Quick Link</h6>
            <div className="mb-4">
              <AnimatedLink
                href="#!"
                className="text-white font-normal"
                color="bg-white"
              >
                Privacy Policy
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="#!"
                className="text-white font-normal"
                color="bg-white"
              >
                Terms Of Use
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/about"
                className="text-white font-normal"
                color="bg-white"
              >
                About
              </AnimatedLink>
            </div>
            <div className="">
              <AnimatedLink
                href="/contact"
                className="text-white font-normal"
                color="bg-white"
              >
                Contact
              </AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
