export default function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Find the best AI tools for your sector
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We compare leading products across marketing, sales, support, engineering, and design.
            </p>
            <div className="mt-6 flex gap-3">
              <input onChange={(e)=>onSearch?.(e.target.value)} placeholder="Search tools or sectors..." className="flex-1 rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"/>
              <button className="px-5 py-3 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold shadow">
                Explore
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl blur-2xl"/>
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500">What we cover</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {['Marketing','Sales','Support','Engineering','Design','Ops'].map(i=> (
                  <li key={i} className="px-3 py-2 rounded-md bg-gray-50 border border-gray-200">{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
