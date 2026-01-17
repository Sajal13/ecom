import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

export type Platform =
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'linkedin'
  | 'twitter'
  | 'github'
  | 'gmail'
  | 'whatsapp';

export type PlatformIconMap = {
  [key in Platform]: IconType;
};

export interface InfoItem {
  id: number;
  count: number;
  icon: ReactNode;
  description: string;
}

export interface Client {
  id: number;
  name: string;
  designation: string;
  socialLinks: {
    id: number;
    platform: Platform;
    link: string;
  }[];
  image: string;
}
