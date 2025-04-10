import QuoteForm from "@/components/forms/QuoteForm"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find the Right</span>
              <span className="block text-blue-600">Life Insurance Coverage</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get personalized life insurance quotes from licensed agents. Protect your family's future with the right coverage at the best rates.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Get Your Free Quote
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Complete the form below to receive personalized life insurance quotes
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Licensed Agents
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Work with experienced, licensed insurance professionals
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Secure Process
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Your information is protected with bank-level security
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Fast Response
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Get connected with an agent within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 