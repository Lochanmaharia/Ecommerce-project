'use client'
import React from "react";
import { FaCheck } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

export default function ColorFilter({ colors }) {

  const router = useRouter()
  const searchParams = useSearchParams();

  const select_colors = searchParams.get("color_slug")
    ? searchParams.get("color_slug").split(",") : [];

  function filterHandler(slug) {
    
    let updatedColors = [];
    if (select_colors.includes(slug)) {
      // remove
      updatedColors = select_colors.filter((c) => c !== slug);
    } else {
      // add
      updatedColors = [...select_colors, slug];
    }

    const query = new URLSearchParams(searchParams.toString());

    if (updatedColors.length > 0) {
      query.set("color_slug", updatedColors.join(","));
    } else {
      query.delete("color_slug");
    }

    router.push(`?${query.toString()}`, { scroll: false });
  }

  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-800">By Color</h4>

        <button
          onClick={() => {
            const query = new URLSearchParams(searchParams.toString());
            query.delete("color_slug");
            router.push(`?${query.toString()}`, { scroll: false });
          }}
          className="text-xs text-teal-500 font-bold hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const selectColor = select_colors.includes(color.slug)

          return (
            <button
              onClick={() => filterHandler(color.slug)}
              key={color._id}
              className="relative w-8 h-8 rounded-full border hover:scale-110 transition-all flex items-center justify-center"
              style={{ backgroundColor: color.color_code }}
            >
              <FaCheck
                size={10}
                className={`text-white ${selectColor ? 'opacity-100' : "opacity-0"}`}
              />
            </button>
          )
        })}
      </div>
    </div>
  );
}