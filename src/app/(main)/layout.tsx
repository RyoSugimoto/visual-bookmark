import Footer from '@/app/shared/components/layout/Footer';
import Header from '@/app/shared/components/layout/Header';
import Stack from '@/components/layout/Stack';

export default function MainLayout({ children }) {
  return (
    <Stack>
      <Header />
      <main>
        <div className="container mx-auto max-w-screen-xl px-4">{children}</div>
      </main>
      <Footer />
    </Stack>
  );
}
