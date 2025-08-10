// pages/api/view.ts
import { google } from 'googleapis'
import path from 'path'
import { promises as fs } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

const SHEET_ID = '1m0nsZI_XXvAWiye8Oop8HCPfhwPbmy02Gn_h53kYVGc' // replace this
// a variable is a JSON

async function getAuth() {
    const keyPath = path.join(process.cwd(), 'config', 'google-service-account.json')
    const content = await fs.readFile(keyPath, 'utf-8')
  // const content: any = process.env.GOOGLE_SERVICE_ACCOUNT || '{}';
  
  const credentials = JSON.parse(content)
  //console.log(content)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  return auth
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  //let type = req.query.type as string
  const type = req.query.type === 'fertilizer' ? 'Fertilizer' : 'Spray'
  const auth = await getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${type}!A1:Z1000`,
  })

  const rows = response.data.values
  res.status(200).json({ rows })
}
