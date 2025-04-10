import { useFormContext } from "react-hook-form"
import { type PersonalInfoInput } from "@/lib/validations/quote-form"
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

const INCOME_RANGES = [
  "Under $30,000",
  "$30,000 - $50,000",
  "$50,000 - $75,000",
  "$75,000 - $100,000",
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "Over $200,000",
]

export default function PersonalInfoStep() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<PersonalInfoInput>()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className={cn(
            "w-full",
            errors.age && "border-red-500 focus:ring-red-500"
          )}
        />
        {errors.age && (
          <p className="text-sm text-red-500">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <Select
          onValueChange={(value) => setValue("gender", value as any)}
          value={watch("gender")}
        >
          <SelectTrigger
            className={cn(
              "w-full",
              errors.gender && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Annual Income Range</Label>
        <Select
          onValueChange={(value) => setValue("incomeRange", value)}
          value={watch("incomeRange")}
        >
          <SelectTrigger
            className={cn(
              "w-full",
              errors.incomeRange && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder="Select income range" />
          </SelectTrigger>
          <SelectContent>
            {INCOME_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.incomeRange && (
          <p className="text-sm text-red-500">{errors.incomeRange.message}</p>
        )}
      </div>
    </div>
  )
} 