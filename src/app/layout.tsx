import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuoteLinker - Life Insurance Quotes',
  description: 'Get personalized life insurance quotes in minutes. Compare rates from top providers.',
  icons: {
    icon: '/globe.svg',
    shortcut: '/globe.svg',
    apple: '/globe.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          {children}
        </main>
      </body>
    </html>
  )
}
