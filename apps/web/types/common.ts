import { ReactNode } from "react";

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