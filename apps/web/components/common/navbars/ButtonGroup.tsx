import { Dispatch, SetStateAction, useState } from 'react';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { GoSearch } from 'react-icons/go';
import Link from 'next/link';
import classNames from 'classnames';
import { dropdownItems } from 'data/common';
import Button from 'components/base/Buttons';
import SearchForm from './SearchForm';
import ThemeTogglerButton from './ThemeTogglerButton';

interface ButtonGroupProps {
  className?: string;
  isMobileNavOpen?: boolean;
  setMobileNavOpen?: Dispatch<SetStateAction<boolean>>
}

const ButtonGroup = ({ className }: ButtonGroupProps) => {
  const [userDropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
      className={classNames(
        'max-lg:mt-auto flex gap-3 justify-between lg:justify-end items-center',
        className,
      )}
    >
      <Button size="small" shape="circle" color="secondary">
        <FaRegHeart className="text-xl" />
      </Button>
      <Button size="small" shape="circle" color="secondary" className="max-lg:hidden">
        <FaCartShopping className="text-xl" />
      </Button>
      <div className="max-lg:hidden">
        <ThemeTogglerButton />
      </div>
      <div className="relative group z-0">
        <Button
          size="small"
          shape="circle"
          color="secondary"
          onClick={() => setDropdownOpen((prev) => !prev)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <FaUser className="text-xl" />
        </Button>
        <AvatarDropdown userDropdownOpen={userDropdownOpen} />
      </div>
    </div>
  );
};

export default ButtonGroup;

const AvatarDropdown = ({ userDropdownOpen }: { userDropdownOpen: boolean }) => {
  return (
    <div
      className={classNames(
        `absolute px-5 py-4 right-0 max-lg:bottom-10 lg:top-10 bg-linear-to-br from-neutral-500/20 via-neutral-800/10 to-neutral-900/5  
        backdrop-blur-md -z-10 lg:group-hover:block w-64 before:content-[''] before:h-10 before:w-12  
        before:bg-transparent before:-z-10 before:absolute before:-top-10 before:right-0`,
        { block: userDropdownOpen, hidden: !userDropdownOpen },
      )}
    >
      <ul className="flex flex-col gap-4">
        {dropdownItems.map((item) => (
          <li key={item.id} className="">
            <Link
              href={item.url}
              className="text-secondary-600 hover:text-secondary-800 text-sm flex items-center"
            >
              <span className="text-xl md:text-2xl mr-4">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
