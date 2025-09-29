import Header from '@/app/shared/components/layout/Header';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto max-w-screen-xl px-4">{children}</div>
      </main>
    </>
  );
}
