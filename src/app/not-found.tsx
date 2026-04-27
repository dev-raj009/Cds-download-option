import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grid px-4"
      style={{ background: 'var(--navy)' }}>
      <div className="text-center">
        <div className="font-orbitron font-black mb-4" style={{ fontSize: '8rem', lineHeight: 1, color: 'rgba(245,197,24,0.08)' }}>404</div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)' }}>
          <i className="fas fa-compass text-2xl" style={{ color: 'var(--gold)' }} />
        </div>
        <h1 className="font-orbitron font-black text-white text-2xl mb-3">Page Not Found</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>The page you are looking for does not exist.</p>
        <Link href="/"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f5c518, #c9a227)', color: '#000' }}>
          <i className="fas fa-home" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
