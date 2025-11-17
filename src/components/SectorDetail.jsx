import { useEffect, useState } from 'react'

export default function SectorDetail({ slug }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!slug) return
      setLoading(true)
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/sectors/${slug}`)
        if (res.ok) {
          const json = await res.json()
          setData(json)
        } else {
          setData(null)
        }
      } catch (e) {
        setData(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (!slug) return null
  if (loading) return <div className="max-w-6xl mx-auto px-4 py-8"><p className="text-gray-500">Loading…</p></div>
  if (!data) return <div className="max-w-6xl mx-auto px-4 py-8"><p className="text-gray-500">Nothing here yet.</p></div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-900">{data.sector.name}</h2>
      {data.comparison && (
        <div className="mt-2 text-gray-700">
          <p className="font-medium">{data.comparison.headline}</p>
          <p className="text-gray-600">{data.comparison.intro}</p>
        </div>
      )}

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {data.tools.map((t) => (
          <a key={t.name} href={t.website} target="_blank" rel="noreferrer" className="block p-5 rounded-xl border bg-white hover:shadow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">{t.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{t.summary}</p>
              </div>
              {typeof t.rating === 'number' && (
                <span className="inline-flex items-center rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1">{t.rating.toFixed(1)} / 5</span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Strengths</p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {t.strengths?.map((s, i) => (<li key={i}>{s}</li>))}
                </ul>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Limitations</p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {t.limitations?.map((s, i) => (<li key={i}>{s}</li>))}
                </ul>
              </div>
            </div>
            {t.pricing && <p className="mt-3 text-sm text-gray-700"><span className="font-medium">Pricing:</span> {t.pricing}</p>}
          </a>
        ))}
      </div>
    </div>
  )
}
