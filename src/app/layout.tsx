import '@/di';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html className="dark dark:bg-gray-800 dark:text-white" lang="ja">
      <body>{children}</body>
    </html>
  );
}
