import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBatchById, getThemeMeta } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'

export const dynamic = 'force-dynamic'
interface Props { params: { batchId: string } }

export default function BatchPage({ params }: Props) {
  const batch = getBatchById(params.batchId)
  if (!batch) notFound()
  const meta = getThemeMeta(batch.theme)

  return (
    <div className="min-h-screen bg-grid" style={{ background: 'var(--navy)' }}>
      <Navbar />

      {/* Hero */}
      <div className="relative pt-16 overflow-hidden">
        <div className="orb w-[400px] h-[400px] top-[-120px] left-[-120px]" style={{ background: 'var(--gold)', opacity: 0.06 }} />
        <div className="orb w-[300px] h-[300px] top-[50px] right-[-80px]" style={{ background: '#1e90ff', opacity: 0.05, animationDelay: '5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(122,163,204,0.5)' }}>
            <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <i className="fas fa-chevron-right text-xs" style={{ color: 'rgba(245,197,24,0.3)' }} />
            <Link href="/batch" className="hover:text-yellow-400 transition-colors">Batches</Link>
            <i className="fas fa-chevron-right text-xs" style={{ color: 'rgba(245,197,24,0.3)' }} />
            <span style={{ color: 'var(--gold)' }}>{batch.name}</span>
          </div>

          {/* Batch header card */}
          <div className="rounded-2xl p-6 md:p-8 page-enter"
            style={{ background: 'rgba(7,20,40,0.8)', border: '1px solid rgba(245,197,24,0.12)', backdropFilter: 'blur(16px)' }}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-4xl shadow-xl flex-shrink-0 glow-gold`}>
                {meta.icon}
              </div>
              <div className="flex-1">
                <span className="badge mb-3 font-orbitron"
                  style={{ background: 'rgba(245,197,24,0.1)', color: 'var(--gold)', border: '1px solid rgba(245,197,24,0.25)', fontSize: '9px' }}>
                  {batch.theme.replace('-', ' ')}
                </span>
                <h1 className="font-orbitron font-black text-white mb-3 text-2xl md:text-3xl">{batch.name}</h1>
                <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-book-open" style={{ color: 'var(--gold)' }} />
                    {batch.subjectCount} Subjects
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-play-circle" style={{ color: 'var(--gold)' }} />
                    {batch.totalClasses} Total Lectures
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
          <h2 className="font-rajdhani font-bold text-white text-2xl tracking-wide">All Subjects</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {batch.subjects.map((subject, i) => {
            const icon = subject.icon.match(/fa-[\w-]+$/)?.[0] || 'fa-book'
            return (
              <Link
                key={subject.id}
                href={`/batch/${batch.id}/${encodeURIComponent(subject.id)}`}
                className="group rounded-xl p-5 card-hover flex flex-col gap-3"
                style={{
                  animationDelay: `${i * 50}ms`,
                  background: 'rgba(7,20,40,0.7)',
                  border: '1px solid rgba(245,197,24,0.08)',
                  backdropFilter: 'blur(8px)',
                }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.15)' }}>
                    <i className={`fas ${icon} text-sm`} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-snug truncate font-rajdhani">{subject.name}</p>
                    <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'rgba(122,163,204,0.5)' }}>
                      <i className="fas fa-play-circle text-[10px]" />
                      {subject.classCount} lectures
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs transition-colors"
                  style={{ color: 'rgba(245,197,24,0.4)' }}>
                  <span className="group-hover:text-yellow-400 transition-colors">View Lectures</span>
                  <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform group-hover:text-yellow-400" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
