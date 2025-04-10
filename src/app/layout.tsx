import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuoteLinker - Life Insurance Lead Generation",
  description: "Get matched with licensed life insurance agents and find the best coverage for your needs.",
  keywords: [
    "life insurance",
    "insurance quotes",
    "term life insurance",
    "whole life insurance",
    "universal life insurance",
    "insurance agents",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
