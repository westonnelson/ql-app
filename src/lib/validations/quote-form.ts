import { z } from 'zod'

export const quoteFormSchema = z.object({
  // Basic Info
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  gender: z.enum(['male', 'female', 'other']),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),

  // Health Info
  height: z.string().regex(/^\d{1,2}'\d{1,2}"$/, 'Please enter height in format: 5\'10"'),
  weight: z.string().regex(/^\d{2,3}$/, 'Please enter weight in pounds'),
  tobaccoUse: z.boolean(),
  healthConditions: z.string().optional(),

  // Coverage Info
  coverageAmount: z.number().min(25000).max(10000000),
  coverageType: z.enum(['term', 'whole', 'universal']),
  termLength: z.number().optional(),
  monthlyBudget: z.number().optional(),

  // Contact Info
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  beneficiaryRelation: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema> 