import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type QuoteFormInput, quoteFormSchema } from "@/lib/validations/quote-form"
import PersonalInfoStep from "./steps/PersonalInfoStep"
import FamilyInfoStep from "./steps/FamilyInfoStep"
import CoverageInfoStep from "./steps/CoverageInfoStep"
import ContactInfoStep from "./steps/ContactInfoStep"
import { Button } from "@/components/ui/button"

const STEPS = ["Personal Info", "Family Info", "Coverage Info", "Contact Info"]

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  
  const methods = useForm<QuoteFormInput>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onChange",
  })
  
  const { handleSubmit, formState: { isValid, isSubmitting } } = methods
  
  const onSubmit = async (data: QuoteFormInput) => {
    try {
      setSubmitStatus("idle")
      setErrorMessage("")
      
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitStatus("success")
      
      // Optional: Redirect to Calendly or thank you page
      // window.location.href = "/thank-you"
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setErrorMessage("There was an error submitting your request. Please try again.")
    }
  }
  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  if (submitStatus === "success") {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Thank You for Your Request!
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          A licensed insurance agent will contact you within 24 hours to discuss
          your coverage options.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => window.location.href = "https://calendly.com/your-link"}
            className="w-full sm:w-auto"
          >
            Schedule a Call Now
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">{step}</span>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-12 ml-2 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form steps */}
          <div className="mt-8">
            {currentStep === 0 && <PersonalInfoStep />}
            {currentStep === 1 && <FamilyInfoStep />}
            {currentStep === 2 && <CoverageInfoStep />}
            {currentStep === 3 && <ContactInfoStep />}
          </div>
        </div>

        {/* Error message */}
        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!isValid}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
} 