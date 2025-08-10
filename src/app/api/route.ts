import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const body = await req.json()
  const { type } = body

  const fileName = type === 'spray' ? 'spray.csv' : 'fertilizer.csv'
  const filePath = path.join(process.cwd(), 'data', fileName)

  let line: string

  if (type === 'spray') {
    line = `${body.no},${body.date},${body.productName},${body.pest},${body.weather},${body.rate},${body.operator},${body.phi}\n`
  } else {
    line = `${body.no},${body.date},${body.fertilizerType},${body.method},${body.rate},${body.operator}\n`
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.appendFile(filePath, line, 'utf-8')

  return new Response(JSON.stringify({ message: 'Entry saved successfully.' }), { status: 200 })
}
