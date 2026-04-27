'use client'
import { useSearchParams, useRouter } from "next/navigation";

import React from "react";

export default function BrandFilter({ brands }) {
  const router = useRouter()
  const searchParams = useSearchParams();
  const select_brand = searchParams.get("brand_slug");
  // console.log(select_brand)

  function filterHandler(slug) {
    const query = new URLSearchParams(searchParams.toString());
    if (slug == select_brand) {
      query.delete("brand_slug")
    } else {
      query.set("brand_slug", slug)
    }
    router.push(`?${query.toString()}`, { scroll: false })
  }


  function clearBrandFilter() {
    const query = new URLSearchParams(searchParams.toString());
    query.delete("brand_slug")
    router.push(`?${query.toString()}`, { scroll: false })


  }



  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <h4 className="font-medium text-gray-800 mb-4">Brands</h4>

      <button onClick={clearBrandFilter} className="w-full mb-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 transition">
        All Brands
      </button>

      <ul className="space-y-2">
        {brands.map((brand) => (
          <li
            onClick={() => filterHandler(brand.slug)}
            key={brand._id}
            className={`flex justify-between px-3 py-2 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition ${select_brand == brand.slug ? "bg-teal-500" : ""}`}
          >
            <span>{brand.name}</span>
            <span>({brand.count || 0})</span>
          </li>
        ))}
      </ul>
    </div >
  );
}