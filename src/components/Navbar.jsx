import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">AI</span>
          <span className="text-lg font-semibold text-gray-900">Sector Tools</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/test" className="text-gray-600 hover:text-gray-900">Status</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900">GitHub</a>
        </nav>
      </div>
    </header>
  )
}
