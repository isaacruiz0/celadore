import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="flex justify-center">
      <h1 className="text-center text-4xl">Celadore</h1>
    </main>
  )
}
