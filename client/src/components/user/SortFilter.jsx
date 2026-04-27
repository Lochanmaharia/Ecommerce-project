'use client'
import React from 'react'
import { useSearchParams, useRouter } from "next/navigation";
export default function SortFilter() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const sort = searchParams.get("sort") || "latest";

    function filterHandler(e) {
        const value = e.target.value;
        const query = new URLSearchParams(searchParams.toString());
        if (value == "latest") {
            query.delete("sort")
        } else {
            query.set("sort", value)
        }
        router.push(`?${query.toString()}`, { scroll: false })

    }

    return (
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
            <div className="flex gap-4">

                <select
                    onChange={filterHandler}
                    className="border rounded px-2 py-1 bg-gray-50"
                >
                    <option value="latest">Latest</option>
                    <option value="asc">Price Low → High</option>
                    <option value="desc">Price High → Low</option>
                </select>

            </div>
        </div>
    )
}
