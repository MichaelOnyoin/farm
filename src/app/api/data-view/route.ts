import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.type === 'fertilizer' ? 'fertilizer' : 'spray'
  const filePath = path.join(process.cwd(), 'data', `${type}.csv`)

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const rows = content.trim().split('\n').map(row => row.split(','))
    res.status(200).json({ rows })
  } catch (err) {
    res.status(500).json({ error: 'Failed to read file' })
  }
}
