import { NextRequest, NextResponse } from 'next/server'
import { decryptObject } from '@/lib/crypto'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

interface TokenPayload {
  url: string
  b: string
  s: string
  c: number
  t: number
  name?: string
}

async function checkYtDlp(): Promise<boolean> {
  try {
    await execAsync('which yt-dlp || yt-dlp --version')
    return true
  } catch {
    return false
  }
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

    const age = Date.now() - (payload.t || 0)
    if (age > 2 * 60 * 60 * 1000) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }

    const zoomUrl = payload.url
    const lectureName = (body.name || 'lecture').replace(/[^\w\s-]/g, '').trim() || 'lecture'

    if (!zoomUrl.includes('zoom.us/rec/')) {
      return NextResponse.json({ error: 'Only Zoom recordings supported' }, { status: 400 })
    }

    const ytdlpAvailable = await checkYtDlp()
    if (!ytdlpAvailable) {
      return NextResponse.json({
        success: false,
        fallback: true,
        error: 'yt-dlp not available on this server',
        url: zoomUrl,
      })
    }

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zoom-'))
    const outputPath = path.join(tmpDir, `${lectureName}.mp4`)

    try {
      const cmd = `yt-dlp --no-warnings --no-playlist -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --merge-output-format mp4 -o "${outputPath}" --no-check-certificate -R 3 "${zoomUrl}"`
      await execAsync(cmd, { timeout: 300000 })

      if (!fs.existsSync(outputPath)) {
        throw new Error('Download failed - output file not found')
      }

      const fileSize = fs.statSync(outputPath).size
      const fileBuffer = fs.readFileSync(outputPath)
      try { fs.rmSync(tmpDir, { recursive: true }) } catch {}

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Disposition': `attachment; filename="${lectureName}.mp4"`,
          'Content-Length': String(fileSize),
          'Cache-Control': 'no-store',
        },
      })
    } catch (err) {
      try { fs.rmSync(tmpDir, { recursive: true }) } catch {}
      throw err
    }
  } catch (error) {
    console.error('[/api/download]', error)
    return NextResponse.json(
      { error: 'Download failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

export const GET = async () => {
  const ytdlpAvailable = await checkYtDlp()
  return NextResponse.json({ downloadAvailable: ytdlpAvailable })
}
