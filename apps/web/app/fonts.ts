import localFont from "next/font/local";

export const poppins = localFont({
  display: 'swap',
  src: [
    { path: './fonts/poppins/Poppins-Thin.ttf', weight: '100', style: 'normal' },
    { path: './fonts/poppins/Poppins-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/poppins/Poppins-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/poppins/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/poppins/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/poppins/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/poppins/Poppins-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/poppins/Poppins-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/poppins/Poppins-Black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-poppins',
});

export const roboto = localFont({
  display: 'swap',
  src: [
    { path: './fonts/roboto/Roboto-Thin.ttf', weight: '100', style: 'normal' },
    { path: './fonts/roboto/Roboto-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/roboto/Roboto-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/roboto/Roboto-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/roboto/Roboto-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/roboto/Roboto-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/roboto/Roboto-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/roboto/Roboto-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: './fonts/roboto/Roboto-Black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-roboto',
});