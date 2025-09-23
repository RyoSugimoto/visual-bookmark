import Footer from '@/components/layout/Footer'
import Stack from '@/components/layout/Stack'
import Logo from '@/components/brand/Logo'

export default function AuthLayout({ children }) {
  return (
    <Stack>
      <header>
        <div className="container mx-auto max-w-screen-md px-4 py-6 flex justify-center">
          <Logo size="3xl" />
        </div>
      </header>
      <main>
        <div
          className="container mx-auto max-w-screen-sm px-4"
        >
          {children}
        </div>
      </main>
      <Footer />
    </Stack>
  )
}
