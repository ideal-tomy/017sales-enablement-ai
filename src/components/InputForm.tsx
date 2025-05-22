import { useState } from "react"
import { Button } from "./ui/button"
import type { FormData } from "../types"

interface InputFormProps {
  onSubmit: (data: FormData) => void
  disabled?: boolean
}

export function InputForm({ onSubmit, disabled }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    companySize: "",
    painPoints: "",
    budget: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="industry" className="text-sm font-medium">
          業種
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
          disabled={disabled}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="例: IT、製造業、小売業など"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="companySize" className="text-sm font-medium">
          企業規模
        </label>
        <input
          type="text"
          id="companySize"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          required
          disabled={disabled}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="例: 従業員数、売上規模など"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="painPoints" className="text-sm font-medium">
          課題
        </label>
        <textarea
          id="painPoints"
          name="painPoints"
          value={formData.painPoints}
          onChange={handleChange}
          required
          disabled={disabled}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="現在の課題や改善したい点を具体的に記入してください"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="budget" className="text-sm font-medium">
          予算
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          disabled={disabled}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="例: 初期費用100万円、月額20万円など"
        />
      </div>

      <Button type="submit" disabled={disabled} className="w-full">
        提案を生成
      </Button>
    </form>
  )
} 