import { NavItem, UserDropDownItem  } from "types/common";
import { LuUser, LuShoppingBag } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";

export const mainNavItems: NavItem[] = [
  {
    id: 1,
    label: 'Home',
    url: '/',
  },
  {
    id: 2,
    label: 'Contact',
    url: '/contact'
  },
  {
    id: 3,
    label: 'About',
    url: '/about'
  }
]

export const dropdownItems: UserDropDownItem[] = [
  {
    id: 1,
    label: 'Manage my Account',
    url: '/profile',
    icon: <LuUser />
  },
  {
    id: 2,
    label: 'My Order',
    url: '/orders',
    icon: <LuShoppingBag />
  },
  {
    id: 3,
    label: 'My Reviews',
    url: '/reviews',
    icon: <FaRegStar />
  }
]