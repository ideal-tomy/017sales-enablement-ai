import { useState, useEffect, useRef } from "react"
import { InputForm } from "./components/InputForm"
import { SuggestionCard } from "./components/SuggestionCard"
import { HistoryList } from "./components/HistoryList"
import type { FormData, Suggestion } from "./types"
import { saveToHistory, getHistory, clearHistory } from "./lib/storage"
import { generateSuggestion } from "./lib/api"
import { ToastProvider, useToast } from "./components/ui/use-toast"

function App() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [history, setHistory] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastFormData = useRef<FormData | null>(null)

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  return (
    <ToastProvider>
      <AppContent
        suggestion={suggestion}
        setSuggestion={setSuggestion}
        history={history}
        setHistory={setHistory}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        lastFormData={lastFormData}
      />
    </ToastProvider>
  )
}

function AppContent({
  suggestion,
  setSuggestion,
  history,
  setHistory,
  isLoading,
  setIsLoading,
  error,
  setError,
  lastFormData,
}: any) {
  const { show } = useToast()

  const handleSubmit = async (data: FormData) => {
    lastFormData.current = data
    try {
      setIsLoading(true)
      setError(null)
      const newSuggestion = await generateSuggestion(data)
      setSuggestion(newSuggestion)
      saveToHistory(newSuggestion)
      setHistory(getHistory())
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期せぬエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (suggestion) {
      const text = `
${suggestion.title}

${suggestion.description}

期待される効果:
${suggestion.expectedOutcome}

実装ステップ:
${suggestion.implementationSteps.map((step: string, index: number) => `${index + 1}. ${step}`).join("\n")}

想定コスト:
${suggestion.estimatedCost}
      `.trim()
      navigator.clipboard.writeText(text)
      show("提案内容がコピーされました！")
    }
  }

  const handleRegenerate = async () => {
    if (!lastFormData.current) return
    await handleSubmit(lastFormData.current)
  }

  const handleHistorySelect = (selectedSuggestion: Suggestion) => {
    setSuggestion(selectedSuggestion)
  }

  const handleHistoryClear = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-xl p-8 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">AI営業支援ツール</h1>
          <p className="text-muted-foreground">
            顧客の課題に基づいて、最適な提案をAIが生成します
          </p>
        </div>

        <InputForm onSubmit={handleSubmit} disabled={isLoading} />

        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-muted-foreground">提案を生成中...</p>
          </div>
        )}

        {suggestion && !isLoading && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">生成された提案</h2>
            <SuggestionCard
              {...suggestion}
              onCopy={handleCopy}
            />
            <button
              className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white font-bold hover:bg-blue-700 transition"
              onClick={handleRegenerate}
            >
              再生成
            </button>
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
