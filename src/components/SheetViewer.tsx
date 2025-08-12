'use client'
import { useEffect, useState } from 'react'

type Props = {
  type: 'spray' | 'fertilizer'
}

export default function SpreadsheetViewer({ type }: Props) {
  const [data, setData] = useState<string[][]>([])

  useEffect(() => {
    //fetch(`/api/google/view?type=${type}`)
    fetch(`/api/data-view?type=${type}`)
      .then((res) => res.json())
      .then((data) => setData(data.rows || []))
  }, [type])

  return (
    <div className='w-full'>
    
      <h2 className="font-bold mb-2 capitalize">{type} Records</h2>
      <div className="overflow-auto mt-4  rounded">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {data[0]?.map((head, i) => (
              <th key={i} className="border px-2 py-1 bg-green-400">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border border border-gray-500 px-2 py-1">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
