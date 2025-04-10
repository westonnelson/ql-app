import Link from 'next/link'
import { ArrowRight, Shield, Target, Users, CheckCircle2, Clock, DollarSign } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm fixed w-full z-50">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
            QuoteLinker
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors" href="/how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors" href="/about">
            About Us
          </Link>
          <Link 
            className="text-sm font-medium bg-cyan-500 text-gray-900 hover:bg-cyan-400 px-6 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30" 
            href="/quote"
          >
            Get My Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_50%)]"></div>
          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Protect Your Family's Future in <span className="text-cyan-400">Minutes</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-gray-400 md:text-xl lg:text-2xl">
                  Get your personalized life insurance quote today. No obligations, just honest rates from trusted providers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link
                  className="flex-1 inline-flex h-12 items-center justify-center rounded-full bg-cyan-500 px-8 text-base font-medium text-gray-900 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 hover:shadow-cyan-400/30 transition-all"
                  href="/quote"
                >
                  Get My Free Quote
                </Link>
                <Link
                  className="flex-1 inline-flex h-12 items-center justify-center rounded-full border-2 border-gray-700 bg-transparent px-8 text-base font-medium text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                  href="/how-it-works"
                >
                  Learn More
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>No Credit Check Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  <span>2-Minute Application</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-cyan-400" />
                  <span>Coverage from $10/month</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-16 md:py-24 bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Why Choose QuoteLinker?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We've simplified the life insurance process to help you protect what matters most.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
                <Shield className="h-12 w-12 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Top-Rated Carriers</h3>
                <p className="text-gray-400 text-center">
                  We partner with A-rated insurance companies to ensure you get the best coverage.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
                <Target className="h-12 w-12 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Personalized Matches</h3>
                <p className="text-gray-400 text-center">
                  Get matched with policies that fit your specific needs and budget.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
                <Users className="h-12 w-12 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Expert Support</h3>
                <p className="text-gray-400 text-center">
                  Licensed agents available to help you make the right choice for your family.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_50%)]"></div>
          <div className="container px-4 md:px-6 mx-auto text-center relative">
            <h2 className="text-3xl font-bold mb-8 text-white">Ready to Protect Your Family?</h2>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-500 px-8 text-base font-medium text-gray-900 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 hover:shadow-cyan-400/30 transition-all"
              href="/quote"
            >
              Get My Free Quote Now
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
                QuoteLinker
              </span>
              <p className="text-sm text-gray-500 mt-2">
                © 2024 QuoteLinker. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-6">
              <Link className="text-sm text-gray-400 hover:text-cyan-400" href="/terms">
                Terms
              </Link>
              <Link className="text-sm text-gray-400 hover:text-cyan-400" href="/privacy">
                Privacy
              </Link>
              <Link className="text-sm text-gray-400 hover:text-cyan-400" href="/contact">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
