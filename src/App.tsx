import { Button } from "./components/ui/button"

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          営業支援施策提案AIツール
        </h1>
        <div className="space-x-4">
          <Button>デフォルト</Button>
          <Button variant="secondary">セカンダリ</Button>
          <Button variant="outline">アウトライン</Button>
          <Button variant="ghost">ゴースト</Button>
        </div>
      </div>
    </div>
  )
}

export default App
