import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export interface NavItem {
  id: number;
  label: string;
  url: string;
}

export interface UserDropDownItem {
  id: number;
  icon: ReactNode;
  label: string;
  url: string
}

export interface BreadcrumbNavItem {
  id: number;
  title: string;
  link: string;
}

export type Color = "primary" | "secondary" | "warning" | "success" | "neutral" | "info";


export interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: IconType;
}