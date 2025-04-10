import { useFormContext } from "react-hook-form"
import { type FamilyInfoInput } from "@/lib/validations/quote-form"
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

const MARITAL_STATUSES = ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]
const DEPENDENT_OPTIONS = Array.from({ length: 6 }, (_, i) => i)

export default function FamilyInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FamilyInfoInput>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Marital Status</Label>
        <Select
          onValueChange={(value) => setValue("maritalStatus", value as any)}
          value={watch("maritalStatus")}
        >
          <SelectTrigger
            className={cn(
              "w-full",
              errors.maritalStatus && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            {MARITAL_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.maritalStatus && (
          <p className="text-sm text-red-500">{errors.maritalStatus.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Number of Dependents</Label>
        <Select
          onValueChange={(value) => setValue("dependents", parseInt(value))}
          value={watch("dependents")?.toString()}
        >
          <SelectTrigger
            className={cn(
              "w-full",
              errors.dependents && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder="Select number of dependents" />
          </SelectTrigger>
          <SelectContent>
            {DEPENDENT_OPTIONS.map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} {num === 1 ? "Dependent" : "Dependents"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.dependents && (
          <p className="text-sm text-red-500">{errors.dependents.message}</p>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Having dependents may affect your life insurance needs. We'll help you find
          the right coverage to protect your loved ones.
        </p>
      </div>
    </div>
  )
} 