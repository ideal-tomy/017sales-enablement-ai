import { useState, useEffect } from "react"
import { InputForm } from "./components/InputForm"
import { SuggestionCard } from "./components/SuggestionCard"
import { HistoryList } from "./components/HistoryList"
import type { FormData, Suggestion } from "./types"
import { saveToHistory, getHistory, clearHistory } from "./lib/storage"

function App() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [history, setHistory] = useState<Suggestion[]>([])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)
    // TODO: OpenAI APIとの連携
    // 仮のデータを設定
    const newSuggestion: Suggestion = {
      title: "AI活用による業務効率化提案",
      description: "AIを活用した業務プロセスの自動化と効率化を実現する提案です。",
      expectedOutcome: "業務効率が30%向上し、人件費の削減と従業員の満足度向上が期待できます。",
      implementationSteps: [
        "現状の業務フロー分析",
        "AIツールの選定と導入",
        "従業員トレーニングの実施",
        "効果測定と改善",
      ],
      estimatedCost: "初期費用: 100万円、月額運用費: 20万円",
      createdAt: new Date().toISOString(),
    }
    setSuggestion(newSuggestion)
    saveToHistory(newSuggestion)
    setHistory(getHistory())
  }

  const handleCopy = () => {
    if (suggestion) {
      const text = `
${suggestion.title}

${suggestion.description}

期待される効果:
${suggestion.expectedOutcome}

実装ステップ:
${suggestion.implementationSteps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

想定コスト:
${suggestion.estimatedCost}
      `.trim()
      navigator.clipboard.writeText(text)
    }
  }

  const handleHistorySelect = (selectedSuggestion: Suggestion) => {
    setSuggestion(selectedSuggestion)
  }

  const handleHistoryClear = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">AI営業支援ツール</h1>
          <p className="text-muted-foreground">
            顧客の課題に基づいて、最適な提案をAIが生成します
          </p>
        </div>

        <InputForm onSubmit={handleSubmit} />

        {suggestion && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">生成された提案</h2>
            <SuggestionCard
              {...suggestion}
              onCopy={handleCopy}
            />
          </div>
        )}

        <HistoryList
          suggestions={history}
          onSelect={handleHistorySelect}
          onClear={handleHistoryClear}
        />
      </div>
    </div>
  )
}

export default App
