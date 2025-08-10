import { google } from 'googleapis'
import { NextRequest } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const SHEET_ID = '1m0nsZI_XXvAWiye8Oop8HCPfhwPbmy02Gn_h53kYVGc' // replace with your actual Sheet ID

// Load credentials
async function getAuth() {
  const keyFilePath = path.join(process.cwd(), 'config', 'google-service-account.json')
  const content = await fs.readFile(keyFilePath, 'utf-8')
  //const content :json = process.env.GOOGLE_SERVICE_ACCOUNT || '{}';
  const credentials = JSON.parse(content)

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  })

  return auth
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const auth = await getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const { type } = body

  let values: string[][]

  if (type === 'spray') {
    values = [[
      body.no,
      body.date,
      body.productName,
      body.pest,
      body.weather,
      body.rate,
      body.operator,
      body.phi
    ]]
  } else {
    values = [[
      body.no, // Assuming 'no' is an auto-incrementing number handled elsewhere
      body.date,
      body.fertilizerType,
      body.method,
      body.rate,
      body.operator
    ]]
  }

  const range = type === 'spray' ? 'Spray!A2' : 'Fertilizer!A2' // Tab names: "Spray", "Fertilizer"

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  })

  return new Response(JSON.stringify({ message: 'Record saved to Google Sheet!' }), { status: 200 })
}
