import { BsShop } from 'react-icons/bs';
import { FaSackDollar } from 'react-icons/fa6';
import { GrServices } from 'react-icons/gr';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import {
  LuFacebook,
  LuGithub,
  LuInstagram,
  LuLinkedin,
  LuMail,
  LuTwitter,
  LuYoutube,
} from 'react-icons/lu';
import { MdWhatsapp } from 'react-icons/md';
import image1 from 'assets/images/clients/1.webp';
import image2 from 'assets/images/clients/2.webp';
import image3 from 'assets/images/clients/3.webp';
import image4 from 'assets/images/clients/4.webp';
import image5 from 'assets/images/clients/5.webp';
import image6 from 'assets/images/clients/6.webp';
import image7 from 'assets/images/clients/7.webp';
import image8 from 'assets/images/clients/8.webp';
import image9 from 'assets/images/clients/9.webp';
import image10 from 'assets/images/clients/10.webp';
import { Client, InfoItem, PlatformIconMap } from 'types/pages/about';

export const infoItems: InfoItem[] = [
  {
    id: 1,
    icon: <BsShop />,
    description: 'Sellers active our site',
    count: 1050,
  },
  {
    id: 2,
    icon: <HiOutlineCurrencyDollar />,
    description: 'Monthly Product Sale',
    count: 3300,
  },
  {
    id: 3,
    icon: <GrServices />,
    description: 'Customer active in our site',
    count: 4500,
  },
  {
    id: 4,
    icon: <FaSackDollar />,
    description: 'Annual gross sale in our site',
    count: 2500,
  },
];

export const clients: Client[] = [
  {
    id: 1,
    name: 'Bob Minion',
    designation: 'BANANA Engineer',
    socialLinks: [
      {
        id: 30,
        platform: 'facebook',
        link: '#!',
      },
      {
        id: 32,
        platform: 'instagram',
        link: '#!',
      },
    ],
    image: image1.src,
  },
  {
    id: 2,
    name: 'Jiraiya Goketsu Monogatari',
    designation: 'Toad rider Engineer',
    socialLinks: [
      {
        id: 35,
        platform: 'linkedin',
        link: '#!',
      },
      {
        id: 36,
        platform: 'instagram',
        link: '#!',
      },
      {
        id: 37,
        platform: 'youtube',
        link: '#!',
      },
    ],
    image: image2.src,
  },
  {
    id: 3,
    name: 'Itachi Uchiha',
    designation: 'Genjutsu designer',
    socialLinks: [
      {
        id: 38,
        platform: 'facebook',
        link: '#!',
      },
      {
        id: 39,
        platform: 'instagram',
        link: '#!',
      },
      {
        id: 40,
        platform: 'youtube',
        link: '#!',
      },
    ],
    image: image3.src,
  },
  {
    id: 4,
    name: 'Kakashi Hatake',
    designation: 'Chidori CEO',
    socialLinks: [
      {
        id: 41,
        platform: 'twitter',
        link: '#!',
      },
      {
        id: 42,
        platform: 'whatsapp',
        link: '#!',
      },
      {
        id: 43,
        platform: 'youtube',
        link: '#!',
      },
    ],
    image: image4.src,
  },
  {
    id: 5,
    name: 'Monkey D. Luffy',
    designation: `Pirate's Managing Director`,
    socialLinks: [
      {
        id: 44,
        platform: 'linkedin',
        link: '#!',
      },
      {
        id: 45,
        platform: 'instagram',
        link: '#!',
      },
      {
        id: 46,
        platform: 'youtube',
        link: '#!',
      },
    ],
    image: image5.src,
  },
  {
    id: 6,
    name: 'Rengoku Kyojuro',
    designation: 'Flame Designer',
    socialLinks: [
      {
        id: 47,
        platform: 'twitter',
        link: '#!',
      },
      {
        id: 48,
        platform: 'instagram',
        link: '#!',
      },
      {
        id: 49,
        platform: 'linkedin',
        link: '#!',
      },
    ],
    image: image7.src,
  },
  {
    id: 7,
    name: 'Sakamoto Taro',
    designation: 'Protagonist of Developer',
    socialLinks: [
      {
        id: 50,
        platform: 'facebook',
        link: '#!',
      },
      {
        id: 51,
        platform: 'instagram',
        link: '#!',
      },
      {
        id: 52,
        platform: 'linkedin',
        link: '#!',
      },
    ],
    image: image8.src,
  },
  {
    id: 8,
    name: 'Naruto Uzumaki',
    designation: 'CEO of Konoha',
    socialLinks: [
      {
        id: 53,
        platform: 'linkedin',
        link: '#!',
      },
      {
        id: 54,
        platform: 'instagram',
        link: '#!',
      },
      {
        id: 55,
        platform: 'youtube',
        link: '#!',
      },
    ],
    image: image6.src,
  },
  {
    id: 9,
    name: 'Zenitsu Agatsuma',
    designation: 'Marketing Designer of fear',
    socialLinks: [
      {
        id: 56,
        platform: 'whatsapp',
        link: '#!',
      },
      {
        id: 57,
        platform: 'github',
        link: '#!',
      },
      {
        id: 58,
        platform: 'twitter',
        link: '#!',
      },
    ],
    image: image9.src,
  },
  {
    id: 10,
    name: 'Roronoa Zoro',
    designation: 'Support Engineer',
    socialLinks: [
      {
        id: 59,
        platform: 'github',
        link: '#!',
      },
      {
        id: 60,
        platform: 'youtube',
        link: '#!',
      },
      {
        id: 61,
        platform: 'linkedin',
        link: '#!',
      },
    ],
    image: image10.src,
  },
];

export const platformsIconMap: PlatformIconMap = {
  facebook: LuFacebook,
  instagram: LuInstagram,
  youtube: LuYoutube,
  linkedin: LuLinkedin,
  twitter: LuTwitter,
  github: LuGithub,
  gmail: LuMail,
  whatsapp: MdWhatsapp,
};
