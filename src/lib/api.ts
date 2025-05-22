import type { FormData, Suggestion } from "../types"
import { generatePrompt } from "./prompts"

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const API_URL = "https://api.openai.com/v1/chat/completions"

export async function generateSuggestion(data: FormData): Promise<Suggestion> {
  if (!API_KEY) {
    throw new Error("OpenAI APIキーが設定されていません")
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "あなたは営業支援の専門家です。顧客の課題に基づいて、具体的で実現可能な提案を作成してください。",
        },
        {
          role: "user",
          content: generatePrompt(data),
        },
      ],
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error("APIリクエストに失敗しました")
  }

  const result = await response.json()
  const content = result.choices[0].message.content

  // 提案の内容をパース
  const lines = content.split("\n")
  const suggestion: Suggestion = {
    title: "",
    description: "",
    expectedOutcome: "",
    implementationSteps: [],
    estimatedCost: "",
    createdAt: new Date().toISOString(),
  }

  let currentSection = ""
  for (const line of lines) {
    if (line.startsWith("タイトル:")) {
      suggestion.title = line.replace("タイトル:", "").trim()
    } else if (line.startsWith("説明:")) {
      suggestion.description = line.replace("説明:", "").trim()
    } else if (line.startsWith("期待される効果:")) {
      suggestion.expectedOutcome = line.replace("期待される効果:", "").trim()
    } else if (line.startsWith("実装ステップ:")) {
      currentSection = "steps"
    } else if (line.startsWith("想定コスト:")) {
      suggestion.estimatedCost = line.replace("想定コスト:", "").trim()
    } else if (currentSection === "steps" && line.match(/^\d+\./)) {
      suggestion.implementationSteps.push(line.replace(/^\d+\./, "").trim())
    }
  }

  return suggestion
} 