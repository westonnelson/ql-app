import { useFormContext } from "react-hook-form"
import { type ContactInfoInput } from "@/lib/validations/quote-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ContactInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactInfoInput>()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            className={cn(
              "w-full",
              errors.firstName && "border-red-500 focus:ring-red-500"
            )}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            className={cn(
              "w-full",
              errors.lastName && "border-red-500 focus:ring-red-500"
            )}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          className={cn(
            "w-full",
            errors.email && "border-red-500 focus:ring-red-500"
          )}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(555) 123-4567"
          {...register("phone")}
          className={cn(
            "w-full",
            errors.phone && "border-red-500 focus:ring-red-500"
          )}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
        <p className="text-sm text-gray-500">
          We'll only use this to discuss your insurance needs
        </p>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Your information is secure and will never be shared without your permission.
              We'll connect you with a licensed agent within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 