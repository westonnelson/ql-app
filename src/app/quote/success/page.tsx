import Link from 'next/link'
import { CheckCircle2, Calendar, PhoneCall, Mail } from 'lucide-react'

export const metadata = {
  title: 'Quote Request Received - QuoteLinker',
  description: 'Your life insurance quote request has been received. A licensed agent will contact you shortly.',
}

export default function QuoteSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Thank You for Your Request!
            </h1>
            
            <p className="mt-4 text-lg text-gray-600">
              We've received your life insurance quote request and a licensed agent will contact you within 24 hours.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <h2 className="text-xl font-semibold text-gray-900">Next Steps:</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Schedule a Call</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Pick a time that works best for you to discuss your coverage options.
                  </p>
                  <Link
                    href="/schedule"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Schedule Now
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <PhoneCall className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Call Us Directly</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Need immediate assistance? Our agents are ready to help.
                  </p>
                  <a
                    href="tel:1-800-555-0123"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    1-800-555-0123
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Check Your Email</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We've sent you a confirmation email with your quote details and next steps.
                    If you don't see it, please check your spam folder.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 