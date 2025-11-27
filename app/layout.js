import './globals.css';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Marjatertun juhlat',
  description: 'Hyvää syntymäpäivää Marjaterttu - sivusto Tomilta',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fi" className="bg-midnight text-white">
      <body className={`${dmSans.className} min-h-screen bg-aurora`}>{children}</body>
    </html>
  );
}
