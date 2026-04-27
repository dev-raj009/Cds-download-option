import { getBatchSummaries } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'
import BatchCard from '@/components/ui/BatchCard'
import type { BatchSummary } from '@/lib/data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  const batches: BatchSummary[] = getBatchSummaries()
  const totalLectures = batches.reduce((a, b) => a + b.totalClasses, 0)

  return (
    <div className="min-h-screen bg-grid" style={{ background: 'var(--navy)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4 overflow-hidden">
        {/* BG orbs */}
        <div className="orb w-[600px] h-[600px] top-[-150px] left-[-200px]"
          style={{ background: 'var(--gold)', opacity: 0.07 }} />
        <div className="orb w-[400px] h-[400px] bottom-[-80px] right-[-100px]"
          style={{ background: '#1e90ff', opacity: 0.08, animationDelay: '4s' }} />
        <div className="orb w-[200px] h-[200px] top-[35%] right-[8%]"
          style={{ background: 'var(--gold)', opacity: 0.06, animationDelay: '7s' }} />

        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid" style={{ opacity: 0.6 }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto page-enter">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-gold mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
            <span className="font-rajdhani font-semibold text-sm tracking-wider" style={{ color: 'var(--gold)' }}>
              India&apos;s Premium Defence Exam Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-orbitron font-black mb-6 leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            <span className="text-white">YOUR PATH TO</span>
            <br />
            <span className="text-gold glow-text-gold">DEFENCE GLORY</span>
          </h1>

          {/* Gold separator */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 max-w-[120px] gold-divider" />
            <i className="fas fa-star text-xs" style={{ color: 'var(--gold)' }} />
            <i className="fas fa-shield-alt text-sm" style={{ color: 'var(--gold)' }} />
            <i className="fas fa-star text-xs" style={{ color: 'var(--gold)' }} />
            <div className="flex-1 max-w-[120px] gold-divider" />
          </div>

          <p className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}>
            Master CDS, NDA & CAPF with structured video lectures from India&apos;s top educators.
            Comprehensive coverage. Expert guidance. <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Zero compromise.</span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: 'fa-layer-group', value: batches.length, label: 'Batches', color: '#f5c518' },
              { icon: 'fa-play-circle', value: `${totalLectures}+`, label: 'Lectures', color: '#1e90ff' },
              { icon: 'fa-book-open', value: '12+', label: 'Subjects', color: '#00e676' },
              { icon: 'fa-trophy', value: '100%', label: 'Dedicated', color: '#f5c518' },
            ].map(s => (
              <div key={s.label} className="glass rounded-2xl px-6 py-5 text-center card-hover"
                style={{ minWidth: '110px', border: `1px solid rgba(245,197,24,0.1)` }}>
                <i className={`fas ${s.icon} text-xl mb-2 block`} style={{ color: s.color }} />
                <div className="font-orbitron text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs font-rajdhani font-semibold tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#batches"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #f5c518, #c9a227)', color: '#000', boxShadow: '0 8px 32px rgba(245,197,24,0.35)' }}>
              <i className="fas fa-rocket" />
              Explore Batches
              <i className="fas fa-chevron-down text-sm animate-bounce" />
            </a>
            <a href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105"
              style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)' }}>
              <i className="fab fa-whatsapp text-lg" />
              Join Channel
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'rgba(245,197,24,0.3)' }}>
          <span className="text-xs font-rajdhani tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-yellow-400/30 to-transparent" />
        </div>
      </section>

      {/* ── BATCHES ── */}
      <section id="batches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 badge glass-gold mb-4"
            style={{ color: 'var(--gold)', border: '1px solid rgba(245,197,24,0.25)' }}>
            <i className="fas fa-layer-group text-xs" />
            Available Batches
          </div>
          <h2 className="font-orbitron font-black text-white mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Choose Your <span className="text-gold">Batch</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((b, i) => <BatchCard key={b.id} batch={b} index={i} />)}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        style={{ borderTop: '1px solid rgba(245,197,24,0.08)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'fa-lock', title: 'Military-Grade Security', desc: 'All content is encrypted and protected. Developer tools are blocked. Video links are never exposed.', color: '#f5c518' },
            { icon: 'fa-graduation-cap', title: 'Expert Faculty', desc: 'Learn from experienced defence exam educators with proven track records and results.', color: '#1e90ff' },
            { icon: 'fa-chart-line', title: 'Complete Coverage', desc: 'Maths, GK, English, Science — all subjects with structured video lectures for CDS, NDA & CAPF.', color: '#00e676' },
          ].map(f => (
            <div key={f.title} className="glass rounded-2xl p-6 card-hover"
              style={{ border: '1px solid rgba(245,197,24,0.08)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                <i className={`fas ${f.icon}`} style={{ color: f.color }} />
              </div>
              <h3 className="font-rajdhani font-bold text-white text-lg mb-2 tracking-wide">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 text-center" style={{ borderTop: '1px solid rgba(245,197,24,0.08)' }}>
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f5c518, #c9a227)' }}>
              <i className="fas fa-spider text-black text-sm" />
            </div>
            <span className="font-orbitron font-black text-gold text-sm tracking-tight">SpidyUniverse</span>
          </div>
        </div>
        <div className="gold-divider max-w-xs mx-auto mb-5" />
        <p className="text-xs" style={{ color: 'rgba(122,163,204,0.5)' }}>
          © {new Date().getFullYear()} SpidyUniverse · Defence Academy · All rights reserved
        </p>
        <p className="text-xs mt-1" style={{ color: 'rgba(122,163,204,0.35)' }}>
          Unauthorized access or sharing of content is strictly prohibited
        </p>
      </footer>
    </div>
  )
}
