import type { Suggestion } from "../types"

const STORAGE_KEY = "sales-enablement-history"

export function saveToHistory(suggestion: Suggestion) {
  const history = getHistory()
  const newHistory = [suggestion, ...history].slice(0, 10) // 最新10件を保持
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
}

export function getHistory(): Suggestion[] {
  const history = localStorage.getItem(STORAGE_KEY)
  return history ? JSON.parse(history) : []
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
} 