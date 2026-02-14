'use client';

import { useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import classNames from 'classnames';
import Button from 'components/base/Buttons';

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Button
      variant="outlined"
      color="neutral"
      shape="circle"
      className={classNames(
        'bg-neutral-800 hover:bg-neutral-900 fixed bottom-18 right-5 z-30',
        {
          'opacity-100 translate-y-0': visible,
          'opacity-0 pointer-events-none': !visible,
        },
      )}
      onClick={scrollToTop}
      aria-label="Scroll To Top"
    >
      <BsArrowUp size={20} className="text-neutral-50" />
    </Button>
  );
};

export default ScrollTop;
