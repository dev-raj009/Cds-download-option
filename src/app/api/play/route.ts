import { NextRequest, NextResponse } from 'next/server'
import { decryptObject } from '@/lib/crypto'

interface TokenPayload {
  url: string
  b: string  // batchId
  s: string  // subjectId
  c: number  // classIdx
  t: number  // timestamp
  _sig?: string
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json().catch(() => null)
    if (!body?.token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    const payload = decryptObject<TokenPayload>(body.token)
    if (!payload?.url) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    // Token age check (max 2 hours)
    const age = Date.now() - (payload.t || 0)
    if (age > 2 * 60 * 60 * 1000) {
      return NextResponse.json({ error: 'Token expired, refresh the page' }, { status: 401 })
    }

    // Return the actual URL - only accessible via this secured endpoint
    // The encrypted token is proof of authorization
    return NextResponse.json({
      success: true,
      url: payload.url,
    })
  } catch (error) {
    console.error('[/api/play]', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }
}
