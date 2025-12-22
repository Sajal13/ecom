import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { poppins, roboto } from 'fonts';
import './globals.css';



export const metadata: Metadata = {
  title: {
    default: 'Ecom App',
    template: '%s | Ecom App', // Template for nested pages
  },
  description: 'Ecommerce platform for all your needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
