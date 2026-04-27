import { NextRequest, NextResponse } from 'next/server'
import { withApiAuth } from '@/lib/auth'
import { getBatchById } from '@/lib/data'

export const GET = withApiAuth(async (
  req: NextRequest,
) => {
  try {
    const batchId = req.nextUrl.pathname.split('/').slice(-1)[0]
    const batch = getBatchById(batchId)
    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 })
    }
    // Return batch with subjects (no class links exposed)
    const safeData = {
      id: batch.id,
      name: batch.name,
      theme: batch.theme,
      totalClasses: batch.totalClasses,
      subjects: batch.subjects.map(s => ({
        id: s.id,
        name: s.name,
        icon: s.icon,
        classCount: s.classCount,
      })),
    }
    return NextResponse.json({ success: true, data: safeData })
  } catch (error) {
    console.error('[API /subjects]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
})
