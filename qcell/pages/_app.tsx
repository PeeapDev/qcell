import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const showNavbar = !['/login', '/register', '/'].includes(router.pathname)

  return (
    <>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
