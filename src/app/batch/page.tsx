import { getBatchSummaries } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'
import BatchCard from '@/components/ui/BatchCard'

export const dynamic = 'force-dynamic'

export default function BatchListPage() {
  const batches = getBatchSummaries()
  const totalLectures = batches.reduce((a, b) => a + b.totalClasses, 0)

  return (
    <div className="min-h-screen bg-dark-900 bg-grid">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 badge bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-4">
            <i className="fas fa-layer-group text-xs" />
            All Batches
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            Defence Prep <span className="text-gradient">Batches</span>
          </h1>
          <p className="text-sky-300/50">
            {batches.length} batches · {totalLectures}+ total lectures
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {batches.map((b, i) => (
            <BatchCard key={b.id} batch={b} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
