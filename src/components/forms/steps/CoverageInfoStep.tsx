import { useFormContext } from "react-hook-form"
import { type CoverageInfoInput } from "@/lib/validations/quote-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const INSURANCE_TYPES = [
  { value: "TERM", label: "Term Life", description: "Affordable coverage for a specific period" },
  { value: "WHOLE", label: "Whole Life", description: "Lifetime coverage with cash value" },
  { value: "UNIVERSAL", label: "Universal Life", description: "Flexible premiums and death benefits" },
  { value: "UNSURE", label: "Not Sure", description: "We'll help you choose the best option" },
]

const COVERAGE_SUGGESTIONS = [
  { amount: 250000, label: "$250,000" },
  { amount: 500000, label: "$500,000" },
  { amount: 750000, label: "$750,000" },
  { amount: 1000000, label: "$1,000,000" },
  { amount: 2000000, label: "$2,000,000" },
]

export default function CoverageInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CoverageInfoInput>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Coverage Amount</Label>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {COVERAGE_SUGGESTIONS.map(({ amount, label }) => (
            <button
              key={amount}
              type="button"
              className={cn(
                "p-2 text-sm border rounded-md transition-colors",
                watch("coverageAmount") === amount
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "hover:bg-gray-50"
              )}
              onClick={() => setValue("coverageAmount", amount)}
            >
              {label}
            </button>
          ))}
        </div>
        <Input
          type="number"
          placeholder="Enter custom amount"
          {...register("coverageAmount", { valueAsNumber: true })}
          className={cn(
            "w-full",
            errors.coverageAmount && "border-red-500 focus:ring-red-500"
          )}
        />
        {errors.coverageAmount && (
          <p className="text-sm text-red-500">{errors.coverageAmount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Insurance Type</Label>
        <Select
          onValueChange={(value) => setValue("insuranceType", value as any)}
          value={watch("insuranceType")}
        >
          <SelectTrigger
            className={cn(
              "w-full",
              errors.insuranceType && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder="Select insurance type" />
          </SelectTrigger>
          <SelectContent>
            {INSURANCE_TYPES.map(({ value, label, description }) => (
              <SelectItem key={value} value={value}>
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.insuranceType && (
          <p className="text-sm text-red-500">{errors.insuranceType.message}</p>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Not sure how much coverage you need? A common recommendation is 10-12
          times your annual income, plus any major debts or future expenses.
        </p>
      </div>
    </div>
  )
} 