import { BsTelephone } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';
import AnimatedLink from 'components/base/AnimateLink';
import Logo from './Logo';
import Subscribe from './Subscribe';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 dark:bg-[#1c1c1c] px-6 py-6 md:py-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12">
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
                className="font-normal"
                color="white"
              >
                abcd@gmail.com
              </AnimatedLink>
            </div>
            <div className="flex gap-2 items-center">
              <BsTelephone className="text-white text-xl" />
              <AnimatedLink
                href="tel:+880123455677"
                className="font-normal"
                color="white"
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
                className="font-normal"
                color="white"
              >
                My Account
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/login"
                className="font-normal"
                color="white"
              >
                Login
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/signup"
                className="font-normal"
                color="white"
              >
                Register
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/cart"
                className="font-normal"
                color="white"
              >
                Cart
              </AnimatedLink>
            </div>
            <div className="">
              <AnimatedLink
                href="/wishlist"
                className="font-normal"
                color="white"
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
                className="font-normal"
                color="white"
              >
                Privacy Policy
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="#!"
                className="font-normal"
                color="white"
              >
                Terms Of Use
              </AnimatedLink>
            </div>
            <div className="mb-4">
              <AnimatedLink
                href="/about"
                className="font-normal"
                color="white"
              >
                About
              </AnimatedLink>
            </div>
            <div className="">
              <AnimatedLink
                href="/contact"
                className="font-normal"
                color="white"
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
