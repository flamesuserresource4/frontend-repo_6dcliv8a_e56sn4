import { useEffect, useState } from 'react'

export default function SectorList({ onPick }) {
  const [sectors, setSectors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/sectors`)
        const data = await res.json()
        setSectors(data)
      } catch (e) {
        setSectors([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-500">Loading sectors…</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sectors.map((s) => (
        <button
          key={s.slug}
          onClick={() => onPick?.(s.slug)}
          className="text-left p-5 rounded-xl border border-gray-200 bg-white hover:shadow transition"
        >
          <h3 className="font-semibold text-lg text-gray-900">{s.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{s.description}</p>
        </button>
      ))}
      {sectors.length === 0 && (
        <div className="col-span-full p-6 rounded-xl border bg-white">
          <p className="text-gray-600">No sectors yet. Click the Seed button to generate starter content.</p>
        </div>
      )}
    </div>
  )
}
