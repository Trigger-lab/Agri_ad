import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { PageLoader } from '@/components/page-loader'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Agri-Ad Zimbabwe | Digital Farming Magazine & Marketplace',
  description: 'Zimbabwe\'s premier agricultural advertising platform and digital magazine featuring farming tips, equipment, livestock, seeds, and agricultural solutions for modern farmers.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


