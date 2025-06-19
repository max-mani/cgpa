import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'KCT CSE CGPA Calculator',
  description: 'CGPA Calculator for KCT CSE Department',
  icons: {
    icon: '/images/kct-logo.jpeg',
    apple: '/images/kct-logo.jpeg',
  },
  metadataBase: new URL('https://kct.ac.in'),
  openGraph: {
    title: 'KCT CSE CGPA Calculator',
    description: 'CGPA Calculator for KCT CSE Department',
    images: ['/images/kct-logo.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KCT CSE CGPA Calculator',
    description: 'CGPA Calculator for KCT CSE Department',
    images: ['/images/kct-logo.jpeg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
