import '@/di';
import '@/styles/globals.css';
import Footer from '@/app/shared/components/layout/Footer';
import Stack from '@/components/layout/Stack';

export default function RootLayout({ children }) {
  return (
    <html className="dark dark:bg-gray-800 dark:text-white" lang="ja">
      <body>
        <Stack>
          {children}
          <Footer />
        </Stack>
      </body>
    </html>
  );
}
