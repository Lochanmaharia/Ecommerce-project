
import React from "react";
import CategoriesSection from "@/components/user/CategoriesSection";
import Filters from "@/components/user/Filters";
import SortFilter from "@/components/user/SortFilter";
export default function RootLayout({ children }) {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-[#f2f3f7] py-6">
        <div className="max-w-auto mx-auto px-4">



          <h2 className="text-lg font-semibold mb-4">
            TOP CELL PHONES & TABLETS
          </h2>

          <div className="bg-white rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left Banner */}
              <div className="lg:col-span-2 bg-[#a9adb6] rounded-xl relative overflow-hidden flex items-center">
                <div className="p-8 max-w-md z-10">
                  <h3 className="text-3xl font-bold text-white">
                    Noise Cancelling
                  </h3>
                  <h4 className="text-2xl text-white mb-4">
                    Headphone
                  </h4>

                  <p className="text-white text-sm">
                    Premium sound quality with latest features.
                  </p>

                  <button className="mt-6 bg-white text-black px-6 py-2 rounded-full text-sm">
                    BUY NOW
                  </button>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1618367581583-1b6c5f5c3d7f"
                  className="absolute right-0 top-0 h-full object-cover"
                />
              </div>

              {/* Right Banner */}
              <div className="rounded-xl bg-linear-to-b from-[#dcdff1] to-[#f3d7a6] p-6 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Redmi Note 12 Pro+
                    </h3>
                    <p className="text-sm text-gray-600">
                      Rise to the challenge
                    </p>
                  </div>

                  <button className="bg-black text-white text-xs px-4 py-2 rounded-full">
                    SHOP NOW
                  </button>
                </div>

                <img
                  src="https://via.placeholder.com/150"
                  className="h-40 object-contain mt-4"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="bg-[#f2f3f7] py-6">
        <div className="max-w-auto mx-auto px-4">
          <div className="bg-white rounded-xl p-6">

            <h3 className="text-sm font-semibold mb-6">
              POPULAR CATEGORIES
            </h3>

              <CategoriesSection />
      

          </div>
        </div>
      </section>

      {/* PRODUCT + FILTER SECTION */}
      <section className="bg-white py-10">
        <div className="max-w-auto mx-auto px-4 grid grid-cols-12 gap-8">

          {/* Filters */}
          <aside className="col-span-12 lg:col-span-3">
            <Filters />
          </aside>

          {/* Products */}
          <main className="col-span-12 lg:col-span-9 space-y-8">
            <SortFilter/>
            {children}
          </main>
        </div>
      </section>
    </>
  );
}