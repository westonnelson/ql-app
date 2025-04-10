import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QuoteLinker - Life Insurance Lead Generation Platform',
  description: 'Connect with qualified life insurance leads through our advanced quote matching system.',
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
          <AnalyticsProvider>
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
              {children}
            </main>
          </AnalyticsProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
