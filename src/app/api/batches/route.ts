import { NextRequest, NextResponse } from 'next/server'
import { withApiAuth } from '@/lib/auth'
import { getBatchSummaries } from '@/lib/data'

export const GET = withApiAuth(async (_req: NextRequest) => {
  try {
    const summaries = getBatchSummaries()
    return NextResponse.json({
      success: true,
      count: summaries.length,
      data: summaries,
    })
  } catch (error) {
    console.error('[API /batches]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
})
