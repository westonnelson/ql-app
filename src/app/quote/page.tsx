import QuoteForm from '@/components/forms/QuoteForm'

export const metadata = {
  title: 'Get Your Free Life Insurance Quote - QuoteLinker',
  description: 'Get an instant life insurance quote in minutes. No obligation, just honest rates from top providers.',
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <QuoteForm />
        </div>
      </div>
    </div>
  )
} 