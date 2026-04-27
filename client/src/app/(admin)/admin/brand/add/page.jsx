"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { client } from "@/utils/helper";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { getcategories } from "@/api/api-call";
import Select from 'react-select'



export default function AddBrand() {
  const [category, setCategory] = useState([])
  const [selectcategory, setSelectCategory] = useState([])
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const slugRef = useRef();

  function categorySelect(cat){
    const selectItem=cat.map((cat)=> cat.value)
    setSelectCategory(selectItem)
  }

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
    const payload = new FormData();
    payload.append("image", event.target.image.files[0]);
    payload.append("name", nameRef.current.value);
    payload.append("slug", slugRef.current.value);
    payload.append("categoryId",JSON.stringify(selectcategory))

    setLoading(true);

    client
      .post("brand/create", payload)
      .then((response) => {
        notify(response.data.message, response.data.success);
        if (response.data.success) {
          nameRef.current.value = "";
          slugRef.current.value = "";
          router.push("/admin/brand");
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


  const fetchCategory = async () => {
    try {
      const res = await getcategories();
      setCategory(res.data);
    } catch (error) {
      console.log(error);
      setCategory([])
    }
  }


  useEffect(() => {
    fetchCategory()
  })

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 rounded-2xl">

      {/* Card */}
      <div className="w-full max-w-5xl mt-15 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-gray-100 p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Add Brand
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create a new Brand 🚀
          </p>
        </div>

        {/* Form */}
        <form onSubmit={SubmitHandler} className="space-y-6">
          <div className="flex items-center justify-between ">


            {/* Name */}
            <div className="w-[49%]">
              <label className=" text-sm font-semibold mb-2 text-gray-700">
                Brand Name
              </label>
              <input
                type="text"
                onChange={createSlug}
                ref={nameRef}
                placeholder="Enter Brand name"
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
              Category
            </label>
            <Select
              isMulti
              onChange={categorySelect}
              closeMenuOnSelect={false}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500" options={
                category.map((cat) => (
                  { value: cat._id, label: cat.name }
                ))
              }
            />

          </div>

          {/*  IMAGE  */}
          <div>
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Brand Image
            </label>
            <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
              <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center justify-center gap-2">


                <div className="text-gray-400 text-3xl">
                  📷
                </div>


                <p className="text-gray-500 text-sm">
                  Click to upload or drag & drop
                </p>

                <p className="text-xs text-gray-400">
                  PNG, JPG (optional)
                </p>
              </label>

              <input
                type="file"
                name="image"
                accept="image/"
                className=" mt-3 ml-26"
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Upload Brand thumbnail (optional)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex  gap-4 pt-4 w-md">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-medium shadow-md hover:scale-105 transition duration-200"
            >
              {loading ? "Please wait..." : "Save Brand"}
            </button>

            <Link href="/admin/brand" className="flex-1">
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