import { useState } from "react"
import { Button } from "./ui/button"

interface InputFormProps {
  onSubmit: (data: {
    industry: string
    companySize: string
    painPoints: string
    budget: string
  }) => void
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState({
    industry: "",
    companySize: "",
    painPoints: "",
    budget: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="例：IT、製造業、小売業など"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="companySize" className="text-sm font-medium">
          企業規模
        </label>
        <select
          id="companySize"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          required
        >
          <option value="">選択してください</option>
          <option value="1-10">1-10名</option>
          <option value="11-50">11-50名</option>
          <option value="51-200">51-200名</option>
          <option value="201-500">201-500名</option>
          <option value="501+">501名以上</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="painPoints" className="text-sm font-medium">
          課題・ニーズ
        </label>
        <textarea
          id="painPoints"
          name="painPoints"
          value={formData.painPoints}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="現在の課題やニーズを具体的に記入してください"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="budget" className="text-sm font-medium">
          予算規模
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          required
        >
          <option value="">選択してください</option>
          <option value="100k-">100万円未満</option>
          <option value="100k-500k">100万円-500万円</option>
          <option value="500k-1m">500万円-1,000万円</option>
          <option value="1m-5m">1,000万円-5,000万円</option>
          <option value="5m+">5,000万円以上</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        提案を生成
      </Button>
    </form>
  )
} 