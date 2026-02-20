import { ThemeToggle } from '@/components/features/ThemeToggle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <ThemeToggle />
    </div>
  )
}
