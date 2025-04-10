import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
}

export function getUTMParams(url: string) {
  const params = new URLSearchParams(url.split('?')[1])
  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
  }
}

export function calculateLeadScore(lead: any): number {
  let score = 0
  
  // Age-based scoring
  if (lead.age >= 25 && lead.age <= 45) score += 20
  else if (lead.age > 45 && lead.age <= 65) score += 15
  
  // Coverage amount scoring
  if (lead.coverageAmount >= 1000000) score += 25
  else if (lead.coverageAmount >= 500000) score += 20
  else if (lead.coverageAmount >= 250000) score += 15
  
  // Dependents scoring
  if (lead.dependents > 0) score += lead.dependents * 5
  
  // Marital status scoring
  if (lead.maritalStatus === 'MARRIED') score += 15
  
  // Income range scoring (assuming income range is a string like "100000-150000")
  const incomeMin = parseInt(lead.incomeRange.split('-')[0])
  if (incomeMin >= 100000) score += 20
  else if (incomeMin >= 75000) score += 15
  else if (incomeMin >= 50000) score += 10
  
  return Math.min(score, 100) // Cap at 100
} 