'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import LectureList from '@/components/ui/LectureList'
import VideoPlayer from '@/components/ui/VideoPlayer'

interface SafeClass { id: string; name: string; token: string }
interface Props {
  batch: { id: string; name: string; theme: string }
  subject: { id: string; name: string; icon: string; classCount: number }
  lectures: SafeClass[]
}

export default function LecturesClient({ batch, subject, lectures }: Props) {
  const [activeToken, setActiveToken] = useState<string | null>(null)
  const [activeName, setActiveName] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const icon = subject.icon.match(/fa-[\w-]+$/)?.[0] || 'fa-book'

  function handlePlay(token: string, name: string) {
    const lec = lectures.find(l => l.token === token)
    setActiveToken(token)
    setActiveName(name)
    setActiveId(lec?.id || null)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-grid" style={{ background: 'var(--navy)' }}>
      <Navbar />

      {/* Top bar */}
      <div className="pt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4"
          style={{ borderBottom: '1px solid rgba(245,197,24,0.08)' }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-3 flex-wrap" style={{ color: 'rgba(122,163,204,0.5)' }}>
            <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <i className="fas fa-chevron-right text-[9px]" style={{ color: 'rgba(245,197,24,0.3)' }} />
            <Link href={`/batch/${batch.id}`} className="hover:text-yellow-400 transition-colors">{batch.name}</Link>
            <i className="fas fa-chevron-right text-[9px]" style={{ color: 'rgba(245,197,24,0.3)' }} />
            <span style={{ color: 'var(--gold)' }}>{subject.name}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)' }}>
                <i className={`fas ${icon} text-sm`} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <h1 className="font-rajdhani font-bold text-white text-lg">{subject.name}</h1>
                <p className="text-xs" style={{ color: 'rgba(122,163,204,0.5)' }}>
                  {subject.classCount} lectures · {batch.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)', color: 'var(--gold)' }}>
              <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-list'}`} />
              {sidebarOpen ? 'Close' : 'Lectures'}
            </button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6 min-h-[calc(100vh-200px)]">

          {/* Video area */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(7,20,40,0.7)', border: '1px solid rgba(245,197,24,0.1)', backdropFilter: 'blur(12px)' }}>
              <VideoPlayer token={activeToken} title={activeName} />
            </div>

            {activeToken && (
              <div className="mt-4 rounded-2xl p-5" style={{ background: 'rgba(7,20,40,0.5)', border: '1px solid rgba(245,197,24,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.15)' }}>
                    <i className="fas fa-info-circle" style={{ color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-bold text-white mb-1">{activeName}</h3>
                    <p className="text-sm" style={{ color: 'rgba(122,163,204,0.6)' }}>{subject.name} · {batch.name}</p>
                    <div className="flex gap-3 mt-3">
                      {[
                        { icon: 'fa-lock', label: 'Encrypted', color: '#f5c518' },
                        { icon: 'fa-shield-alt', label: 'Protected', color: '#00e676' },
                        { icon: 'fa-eye-slash', label: 'Link Hidden', color: '#1e90ff' },
                      ].map(b => (
                        <span key={b.label} className="badge text-[9px]"
                          style={{ background: `${b.color}15`, color: b.color, border: `1px solid ${b.color}30` }}>
                          <i className={`fas ${b.icon}`} /> {b.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {sidebarOpen && (
              <div className="lg:hidden mt-4 rounded-2xl p-5 flex flex-col"
                style={{ maxHeight: '70vh', overflow: 'auto', background: 'rgba(7,20,40,0.8)', border: '1px solid rgba(245,197,24,0.1)' }}>
                <LectureList lectures={lectures} onPlay={handlePlay} activeId={activeId || undefined} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div
            className="hidden lg:flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: '360px',
              flexShrink: 0,
              maxHeight: 'calc(100vh - 140px)',
              position: 'sticky',
              top: '80px',
              background: 'rgba(7,20,40,0.8)',
              border: '1px solid rgba(245,197,24,0.1)',
              backdropFilter: 'blur(12px)',
            }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(245,197,24,0.08)' }}>
              <h2 className="font-rajdhani font-bold text-white flex items-center gap-2 text-sm tracking-wide">
                <i className="fas fa-list text-xs" style={{ color: 'var(--gold)' }} />
                Lecture List
                <span className="ml-auto badge"
                  style={{ background: 'rgba(245,197,24,0.1)', color: 'var(--gold)', border: '1px solid rgba(245,197,24,0.2)', fontSize: '10px' }}>
                  {lectures.length}
                </span>
              </h2>
            </div>
            <div className="flex-1 min-h-0 flex flex-col p-4">
              <LectureList lectures={lectures} onPlay={handlePlay} activeId={activeId || undefined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
