export interface FormData {
  industry: string
  companySize: string
  painPoints: string
  budget: string
}

export interface Suggestion {
  title: string
  description: string
  expectedOutcome: string
  implementationSteps: string[]
  estimatedCost: string
  category: string[]
  createdAt?: string
} 