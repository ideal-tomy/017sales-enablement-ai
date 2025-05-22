import * as React from "react"

interface ToastContextType {
  show: (message: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")

  const show = (msg: string) => {
    setMessage(msg)
    setOpen(true)
    setTimeout(() => setOpen(false), 2000)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {open && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded bg-gray-900 text-white px-6 py-3 shadow-lg animate-fade-in">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return ctx
} 