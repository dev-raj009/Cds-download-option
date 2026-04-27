import { NextRequest, NextResponse } from 'next/server'
import { withApiAuth } from '@/lib/auth'
import { getBatchById } from '@/lib/data'
import { decrypt } from '@/lib/crypto'

export const GET = withApiAuth(async (req: NextRequest) => {
  try {
    const parts = req.nextUrl.pathname.split('/')
    const subjectIdEnc = parts[parts.length - 1]
    const batchId = parts[parts.length - 2]

    const batch = getBatchById(batchId)
    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 })
    }

    // Find subject by decrypting IDs
    const subject = batch.subjects.find(s => s.id === subjectIdEnc)
    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 })
    }

    // Return classes with tokens (no raw links)
    const safeClasses = subject.classes.map(cls => ({
      id: cls.id,
      name: cls.name,
      token: cls.token,  // encrypted - client uses /api/play to resolve
    }))

    return NextResponse.json({
      success: true,
      subject: { id: subject.id, name: subject.name, icon: subject.icon },
      batch: { id: batch.id, name: batch.name, theme: batch.theme },
      count: safeClasses.length,
      data: safeClasses,
    })
  } catch (error) {
    console.error('[API /lectures]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
})

// Unused import suppression
void decrypt
