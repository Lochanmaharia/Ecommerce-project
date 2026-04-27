import React from "react";
import { getcategories } from "@/api/api-call";

export default async function CategoriesSection() {

  const category_response = await getcategories({ limit: 10, is_popular: true, status: true });
  const imageUrl = category_response?.meta?.imageBaseUrl;
  const categories = category_response?.data || []

  return (
    <div className="mx-auto px-4 py-8">

      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Shop by Category
      </h2>

      <div className="grid grid-cols-5 gap-6">

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex  items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition"
          >

            {/* Image */}
            <div className="w-16 h-16 flex flex-col items-center justify-center bg-gray-100 rounded-xl mb-4">
              <img
                src={`${imageUrl}/${cat.image}`}
                alt={cat.name}
                className="h-10 object-contain"
              />
            </div>

            {/* Text */}
            <h4 className="text-sm font-semibold text-gray-900">
              {cat.name}
            </h4>

            <p className="text-xs text-gray-500 mt-1">
              {cat.count || 0} Items
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}