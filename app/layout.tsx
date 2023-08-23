import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Wyraa MVP',
  description: 'Prototipo - Modulo de solicitudes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
