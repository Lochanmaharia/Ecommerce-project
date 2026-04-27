"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { client } from "@/utils/helper";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";


export default function AddColor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const slugRef = useRef();
  const colorRef = useRef();

  function createSlug() {
    let catSlug = nameRef.current.value;

    let slug = catSlug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    slugRef.current.value = slug;
  }

  const SubmitHandler = (event) => {
    event.preventDefault();


    console.log({
      name: nameRef.current.value,
      slug: slugRef.current.value,
      color_code: colorRef.current.value,
    });


    const payload = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      color_code: colorRef.current.value,
    };

    setLoading(true);

    client.post("/color/create", payload).then((response) => {
      notify(response.data.message, response.data.success);
      if (response.data.success) {
        nameRef.current.value = "";
        slugRef.current.value = "";
        colorRef.current.value = "";
        router.push("/admin/color");
        router.refresh();
      }
    })
      .catch((err) => {
        console.log(err);
        const message =
          err?.response?.data?.message || "Internal Server Error";
        notify(message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 rounded-2xl">

      {/* Card */}
      <div className="w-full max-w-5xl mt-15 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-gray-100 p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Add Color          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create a new color 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={SubmitHandler} className="space-y-6">
          <div className="flex items-center justify-between ">


            {/* Name */}
            <div className="w-[49%]">
              <label className=" text-sm font-semibold mb-2 text-gray-700">
                Color Name
              </label>


              <input
                type="text"
                onChange={createSlug}
                ref={nameRef}
                placeholder="enter-color"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>

            {/* Slug */}
            <div className="w-[49%]">
              <label className="text-sm font-semibold mb-2 text-gray-700">
                Slug
              </label>
              <input
                type="text"
                ref={slugRef}
                readOnly
                placeholder="enter-slug"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Color
            </label>
            <input
              type="text"
              ref={colorRef}   // ✅ yaha lagana hai
              placeholder="enter-color"
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500"
            />
          </div>


          {/* Buttons */}
          <div className="flex  gap-4 pt-4 w-md">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-medium shadow-md hover:scale-105 transition duration-200"
            >
              {loading ? "Please wait..." : "Save Color"}
            </button>

            <Link href="/admin/color" className="flex-1">
              <button
                type="button"
                className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
}