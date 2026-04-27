import type { Metadata } from 'next'
import './globals.css'
import SecurityProvider from '@/components/SecurityProvider'

export const metadata: Metadata = {
  title: 'SpidyUniverse | Defence Exam Prep',
  description: 'Premium defence exam preparation platform for CDS, NDA, AFCAT & CAPF',
  icons: { icon: '/favicon.ico' },
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: 'var(--navy)' }} className="text-white min-h-screen antialiased">
        <SecurityProvider />
        {children}
      </body>
    </html>
  )
}
