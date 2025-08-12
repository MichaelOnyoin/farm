import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

async function getMaxNoForType(type: string): Promise<number> {
  const filePath = path.join(process.cwd(), 'data', `${type}.csv`)
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const rows = content.trim().split('\n').map(row => row.split(','))
    // Assuming the first column is 'no'
    const numbers = rows
      .slice(1) // skip header
      .map(row => parseInt(row[0], 10))
      .filter(n => !isNaN(n))
    return numbers.length ? Math.max(...numbers) : 0
  } catch {
    return 0
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'spray'
  const maxNo = await getMaxNoForType(type)
  return NextResponse.json({ nextNo: maxNo + 1 })
}