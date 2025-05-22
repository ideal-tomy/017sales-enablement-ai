import { Button } from "./ui/button"
import type { Suggestion } from "../types"

interface HistoryListProps {
  suggestions: Suggestion[]
  onSelect: (suggestion: Suggestion) => void
  onClear: () => void
}

export function HistoryList({ suggestions, onSelect, onClear }: HistoryListProps) {
  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">履歴</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground"
        >
          履歴をクリア
        </Button>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="w-full rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
          >
            <div className="space-y-1">
              <h3 className="font-medium text-card-foreground">
                {suggestion.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {suggestion.description}
              </p>
              {suggestion.createdAt && (
                <p className="text-xs text-muted-foreground">
                  {new Date(suggestion.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 