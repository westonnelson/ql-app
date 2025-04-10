import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { quoteFormSchema } from "@/lib/validations/quote-form"
import type { QuoteFormData } from "@/lib/validations/quote-form"
import BasicInfoStep from "./steps/BasicInfoStep"
import HealthInfoStep from "./steps/HealthInfoStep"
import CoverageStep from "./steps/CoverageStep"
import ContactStep from "./steps/ContactStep"

const steps = [
  { id: 'basic-info', title: 'Basic Info' },
  { id: 'health', title: 'Health Details' },
  { id: 'coverage', title: 'Coverage Needs' },
  { id: 'contact', title: 'Contact Info' },
]

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onChange",
  })

  const { handleSubmit, trigger } = methods

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep)
    const isValid = await trigger(fields)
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    window.scrollTo(0, 0)
  }

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      // Redirect to success page
      window.location.href = "/quote/success"
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0:
        return ['firstName', 'lastName', 'dateOfBirth', 'gender', 'zipCode']
      case 1:
        return ['height', 'weight', 'tobaccoUse', 'healthConditions']
      case 2:
        return ['coverageAmount', 'coverageType', 'termLength', 'monthlyBudget']
      case 3:
        return ['email', 'phone', 'beneficiaryRelation']
      default:
        return []
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                index === currentStep
                  ? 'text-blue-600 font-medium'
                  : index < currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="h-2 flex rounded-full bg-gray-200 overflow-hidden">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 ${
                index <= currentStep ? 'bg-blue-600' : 'bg-transparent'
              } ${index === 0 ? 'rounded-l-full' : ''} ${
                index === steps.length - 1 ? 'rounded-r-full' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && <BasicInfoStep />}
          {currentStep === 1 && <HealthInfoStep />}
          {currentStep === 2 && <CoverageStep />}
          {currentStep === 3 && <ContactStep />}

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors ${
                currentStep === 0 ? 'invisible' : ''
              }`}
            >
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Get My Quote'}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  )
} 