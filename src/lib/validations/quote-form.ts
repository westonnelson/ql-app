import * as z from "zod"

export const personalInfoSchema = z.object({
  age: z.number().min(18).max(85),
  gender: z.enum(["male", "female", "other"]),
  incomeRange: z.string(),
})

export const familyInfoSchema = z.object({
  maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
  dependents: z.number().min(0).max(5),
})

export const coverageInfoSchema = z.object({
  coverageAmount: z.number().min(50000).max(10000000),
  insuranceType: z.enum(["TERM", "WHOLE", "UNIVERSAL", "UNSURE"]),
})

export const contactInfoSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
})

// Combined schema for the entire form
export const quoteFormSchema = z.object({
  ...personalInfoSchema.shape,
  ...familyInfoSchema.shape,
  ...coverageInfoSchema.shape,
  ...contactInfoSchema.shape,
})

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>
export type FamilyInfoInput = z.infer<typeof familyInfoSchema>
export type CoverageInfoInput = z.infer<typeof coverageInfoSchema>
export type ContactInfoInput = z.infer<typeof contactInfoSchema>
export type QuoteFormInput = z.infer<typeof quoteFormSchema> 