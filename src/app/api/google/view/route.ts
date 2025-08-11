// pages/api/view.ts
//'use server'
import { google } from 'googleapis'
import path from 'path'
import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'

const SHEET_ID = '1m0nsZI_XXvAWiye8Oop8HCPfhwPbmy02Gn_h53kYVGc' // replace this

async function getAuth() {
  const keyPath = path.join(process.cwd(), 'config', 'google-service-account.json')
  const content = await fs.readFile(keyPath, 'utf-8')
  const credentials = JSON.parse(content)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  return auth
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') === 'fertilizer' ? 'Fertilizer' : 'Spray'
  try {
    const auth = await getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${type}!A1:Z1000`,
    })

    const rows = response.data.values
    return NextResponse.json({ rows })
  } catch (err) {
    console.error('Error fetching data from Google Sheets:', err)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
