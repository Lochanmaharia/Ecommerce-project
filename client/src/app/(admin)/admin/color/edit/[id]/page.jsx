"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { client, notify } from "@/utils/helper";
import { useRouter, useParams } from "next/navigation";

export default function EditColor() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const slugRef = useRef();
  const colorRef = useRef();


  useEffect(() => {
    if (id) {
      client
        .get(`/color/${id}`)
        .then((res) => {
          const data = res.data.data;

          nameRef.current.value = data.name;
          slugRef.current.value = data.slug;
          colorRef.current.value = data.color_code;
        })
        .catch((err) => {
          notify("Failed to load data", false);
        });
    }
  }, [id]);

  function createSlug() {
    let value = nameRef.current.value;

    let slug = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    slugRef.current.value = slug;
  }

  
  const SubmitHandler = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      color_code: colorRef.current.value,
    };

    setLoading(true);

    client
      .put(`/color/update/${id}`, payload) 
      .then((res) => {
        notify(res.data.message, res.data.success);

        if (res.data.success) {
          router.push("/admin/color");
          router.refresh();
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message || "Internal Server Error";
        notify(message, false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6 rounded-2xl">
      <div className="w-full max-w-5xl mt-15 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-gray-100 p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Color
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Update existing color ✏️
          </p>
        </div>

        <form onSubmit={SubmitHandler} className="space-y-6">

          <div className="flex justify-between">

            {/* Name */}
            <div className="w-[49%]">
              <label className="text-sm font-semibold text-gray-700">
                Color Name
              </label>
              <input
                type="text"
                ref={nameRef}
                onChange={createSlug}
                className="w-full border rounded-xl px-4 py-2.5"
              />
            </div>

            {/* Slug */}
            <div className="w-[49%]">
              <label className="text-sm font-semibold text-gray-700">
                Slug
              </label>
              <input
                type="text"
                ref={slugRef}
                readOnly
                className="w-full border bg-gray-100 rounded-xl px-4 py-2.5"
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Color Code
            </label>
            <input
              type="text"
              ref={colorRef}
              className="w-full border bg-gray-100 rounded-xl px-4 py-2.5"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 text-white py-2.5 rounded-xl"
            >
              {loading ? "Updating..." : "Update Color"}
            </button>

            <Link href="/admin/color" className="flex-1">
              <button
                type="button"
                className="w-full bg-gray-200 py-2.5 rounded-xl"
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