import { InputForm } from "./components/InputForm"

function App() {
  const handleSubmit = (data: {
    industry: string
    companySize: string
    painPoints: string
    budget: string
  }) => {
    console.log("フォームデータ:", data)
    // TODO: OpenAI APIとの連携
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            営業支援施策提案AIツール
          </h1>
          <p className="text-muted-foreground">
            顧客の課題やニーズに基づいて、最適な営業支援施策を提案します
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <InputForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default App
