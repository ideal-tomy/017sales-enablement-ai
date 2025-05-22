import { Button } from "./ui/button"

interface SuggestionCardProps {
  title: string
  description: string
  expectedOutcome: string
  implementationSteps: string[]
  estimatedCost: string
  onCopy: () => void
}

export function SuggestionCard({
  title,
  description,
  expectedOutcome,
  implementationSteps,
  estimatedCost,
  onCopy,
}: SuggestionCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground">期待される効果</h4>
          <p className="text-sm text-muted-foreground">{expectedOutcome}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground">実装ステップ</h4>
          <ol className="list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
            {implementationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground">想定コスト</h4>
          <p className="text-sm text-muted-foreground">{estimatedCost}</p>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            className="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-copy"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            コピー
          </Button>
        </div>
      </div>
    </div>
  )
} 