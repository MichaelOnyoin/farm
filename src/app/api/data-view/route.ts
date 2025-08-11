import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') === 'fertilizer' ? 'fertilizer' : 'spray'
  const filePath = path.join(process.cwd(), 'data', `${type}.csv`)

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const rows = content.trim().split('\n').map(row => row.split(','))
    return NextResponse.json({ rows })
  } catch (err) {
    console.error('Error reading file:', err)
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}