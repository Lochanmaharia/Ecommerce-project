'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PriceFilter() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const MIN_LIMIT = 0
  const MAX_LIMIT = 10000

  const minQuery = Number(searchParams.get('min_price')) || MIN_LIMIT
  const maxQuery = Number(searchParams.get('max_price')) || MAX_LIMIT

  const [min, setMin] = useState(minQuery)
  const [max, setMax] = useState(maxQuery)

  const handleMinChange = (e) => {
    let value = Number(e.target.value)
    
    setMin(value)
  }

  const handleMaxChange = (e) => {
    let value = Number(e.target.value)

    setMax(value)
  }

  // 👉 Apply filter
  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (min === MIN_LIMIT && max === MAX_LIMIT) {
      params.delete('min_price')
      params.delete('max_price')
    } else {
      params.set('min_price', min)
      params.set('max_price', max)
    }

    router.push(`?${params.toString()}`)
  }

  // 👉 Clear filter
  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('min_price')
    params.delete('max_price')

    setMin(MIN_LIMIT)
    setMax(MAX_LIMIT)

    router.push(`?${params.toString()}`)
  }

  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <h4 className="font-medium text-gray-800 mb-3">Price</h4>

      <div className="flex gap-3 mb-3">
        <input
          type="number"
          value={min}
          onChange={handleMinChange}
          className="w-full p-2 rounded-lg border outline-none"
          placeholder="Min"
        />

        <input
          type="number"
          value={max}
          onChange={handleMaxChange}
          className="w-full p-2 rounded-lg border outline-none"
          placeholder="Max"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={applyFilter}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Go
        </button>

        <button
          onClick={clearFilter}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Clear
        </button>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        ₹{min} - ₹{max}
      </div>
    </div>
  )
}