"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryFilter({ categories }) {
  const pathname = usePathname();
  return (
    <div className='bg-[#EEEFF6] rounded-2xl shadow-sm p-5'>
      <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
      <Link href="/products">
        <button className="w-full mb-3 py-2 rounded-lg border bg-gray-50 hover:bg-gray-100 transition font-medium">
          All Categories
        </button>
      </Link>


      <ul className="space-y-2">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/products/${cat.slug}`}>

            <li
            className={`flex ${pathname == "/products/" + cat.slug ? "bg-teal-500" : ""} justify-between px-3 py-2 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-200 transition`}>

              <div>{cat.name}</div>
              <span>({cat.count || 0})</span>
            </li>
          </Link>
        ))}
      </ul>
    </div >
  );
}