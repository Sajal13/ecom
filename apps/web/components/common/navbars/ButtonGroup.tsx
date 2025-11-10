import { GoSearch } from "react-icons/go";
import { FaRegHeart, FaUser } from 'react-icons/fa';
import Button from 'components/base/Buttons';
import classNames from 'classnames';
import { FaCartShopping } from "react-icons/fa6";

interface ButtonGroupProps {
  className?: string
}

const ButtonGroup = ({ className }: ButtonGroupProps) => {
  return (
    <div className={classNames("max-lg:mt-auto flex gap-3 justify-between lg:justify-end items-center", className)}>
      <Button size="small" shape='circle' color="secondary" className="lg:hidden">
        <GoSearch className="text-xl" />
      </Button>
      <Button size="small" shape='circle' color="secondary" className="max-lg:hidden">
        <FaCartShopping className="text-xl" />
      </Button>
      <Button size="small" shape='circle' color="secondary">
        <FaRegHeart className="text-xl" />
      </Button>
      <Button size="small" shape='circle' color="secondary">
        <FaUser className="text-xl" />
      </Button>
    </div>
  );
};

export default ButtonGroup;
