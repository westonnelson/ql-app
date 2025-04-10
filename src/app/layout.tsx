import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider'
import './globals.css'
import PostHogProvider from '@/components/providers/PostHogProvider'

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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
      }}
    >
      <html lang="en" className={inter.className}>
        <body>
          <PostHogProvider>
            <AnalyticsProvider>
              <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {children}
              </main>
            </AnalyticsProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
