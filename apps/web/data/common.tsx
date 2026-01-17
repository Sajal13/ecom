import { Highlight, NavItem, UserDropDownItem  } from "types/common";
import { LuUser, LuShoppingBag, LuShieldCheck } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaHeadset, FaTruckFast } from "react-icons/fa6";

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
    url: '/my-reviews',
    icon: <FaRegStar />
  },
  {
    id: 4,
    label: 'Log In',
    url: '/login',
    icon: <MdLogin />
  }
];

export const highlights: Highlight[] = [
  {
    id: 1,
    title: 'FREE AND FAST DELIVERY',
    description: 'Free delivery on all orders over $99',
    icon: FaTruckFast,
  },
  {
    id: 2,
    title: '24/7 CUSTOMER SERVICE',
    description: 'Friendly 24/7 customer support',
    icon: FaHeadset,
  },
  {
    id: 3,
    title: 'MONEY BACK GUARANTEE',
    description: 'We return money within 30 days',
    icon: LuShieldCheck,
  }
]