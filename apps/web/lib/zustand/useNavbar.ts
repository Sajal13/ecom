import { create } from 'zustand';

interface NavbarState {
  isMobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
}

export const useNavbar = create<NavbarState>((set) => ({
  isMobileNavOpen: false,
  openMobileNav: () => set(() => ({ isMobileNavOpen: true })),
  closeMobileNav: () => set(() => ({ isMobileNavOpen: false })),
}));
