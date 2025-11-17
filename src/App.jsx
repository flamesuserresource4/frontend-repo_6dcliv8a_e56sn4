import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectorList from './components/SectorList'
import SectorDetail from './components/SectorDetail'

function App() {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query) { setResults([]); return }
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/search`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ q: query })})
        const json = await res.json()
        setResults(json.results || [])
      } catch (e) {
        setResults([])
      }
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  const seed = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      await fetch(`${base}/seed`, { method: 'POST' })
      // reload sectors by toggling selected
      setSelected(null)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Navbar />
      <Hero onSearch={setQuery} />

      {query && (
        <div className="max-w-6xl mx-auto px-4 -mt-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-500">Search results</p>
            <div className="mt-2 grid md:grid-cols-2 gap-3">
              {results.map((r) => (
                <button key={r.name+r.sector_slug} onClick={() => setSelected(r.sector_slug)} className="text-left p-4 rounded-lg border hover:shadow">
                  <p className="text-sm text-gray-500">{r.sector_slug}</p>
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-sm text-gray-600">{r.summary}</p>
                </button>
              ))}
              {results.length === 0 && (
                <p className="text-gray-500 text-sm">No matches yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between mt-8">
        <h2 className="text-xl font-bold text-gray-900">Explore sectors</h2>
        <button onClick={seed} className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold">Seed demo content</button>
      </div>

      {!selected && <SectorList onPick={setSelected} />}
      {selected && <SectorDetail slug={selected} />}

      <footer className="mt-16 py-10 text-center text-sm text-gray-500">
        <p>Curated comparisons of AI tools by sector. Updated regularly.</p>
      </footer>
    </div>
  )
}

export default App
