'use client'
import { useState } from 'react'
import SpreadsheetViewer from '@/components/SheetViewer'
export default function Home() {
  const [form, setForm] = useState({
    type: 'spray', // or 'fertilizer'
    no: '',
    date: '',
    productName: '',
    pest: '',
    weather: '',
    rate: '',
    operator: '',
    phi: '',
    fertilizerType: '',
    method: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    alert(data.message)
  }
//add auto increasing numbers
  return (
    <main className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Spray & Fertilizer Log Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
          <option value="spray" >Spray</option>
          <option value="fertilizer">Fertilizer</option>
        </select>
        <input name="no" placeholder="" type='hidden' value={1} onChange={handleChange} className=""  />
        <div>
        <label htmlFor="date">Date of Application</label>
        <input name="date" type="date" onChange={handleChange} className="block w-full border p-2 rounded" required />
        </div>

        {form.type === 'spray' ? (
          <>
            <div>
            <label htmlFor="productName">Product Name</label>
            <input name="productName" placeholder="Product Name" onChange={handleChange} className="w-full border p-2 flex-stretch focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300" />
            </div>
            <div>
              <label htmlFor="pest">Target Pest/Disease</label>
              <input name="pest" placeholder="Target Pest/Disease" onChange={handleChange} className="w-full border p-2 " required />
            </div>
            <div>
              <label htmlFor="weather">Weather Conditions</label>
              <input name="weather" placeholder="Weather Conditions" onChange={handleChange} className="w-full border p-2" required/>
            </div>
            <div>
              <label htmlFor="rate">Rate Used</label>
              <input name="rate" placeholder="Rate Used" onChange={handleChange} className="w-full border p-2" required/>
            </div>
            <div>
              <label htmlFor="operator">Operator Name</label>
            <input name="operator" placeholder="Operator Name" onChange={handleChange} className="w-full border p-2" required />
            </div>
            <div>
              <label htmlFor="phi">Pre-Harvest Interval (PHI)</label>
              <input name="phi" placeholder="Pre-Harvest Interval (PHI)" onChange={handleChange} className="w-full border p-2" required/>
            </div>
          </>
        ) : (
          <>
            <div>
            <label htmlFor="fertilizerType">Fertilizer Type</label>
            <input name="fertilizerType" placeholder="Fertilizer Type" onChange={handleChange} className="w-full border p-2" required/>
            </div>
            <div>
              <label htmlFor="method">Method of Application</label>
              <input name="method" placeholder="Method of Application" onChange={handleChange} className="w-full border p-2" required />
            </div>
            <div>
              <label htmlFor="rate">Rate Used per Hectare</label>
              <input name="rate" placeholder="Rate Used per Hectare" onChange={handleChange} className="w-full border p-2" />
            </div>
            <div>
              <label htmlFor="operator">Operator Name</label>
              <input name="operator" placeholder="Operator Name" onChange={handleChange} className="w-full border p-2" required/>
            </div>
          </>
        )}

        <button type="submit" className="bg-green-600 absolute right-4 mb-4 text-white px-4 py-2 rounded">Submit</button>
      </form>
      <SpreadsheetViewer type={'spray'} />
    </main>
  )
}
