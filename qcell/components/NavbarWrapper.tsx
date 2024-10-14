'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export function NavbarWrapper() {
  const pathname = usePathname()
  const showNavbar = !['/login', '/register', '/'].includes(pathname)

  if (!showNavbar) return null
  return <Navbar />
}
