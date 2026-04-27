
'use client'
import { use } from 'react'
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/utils/helper";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { getcategoriesById } from '@/api/api-call';


export default function EditCategory({ params }) {

    const [image, setImage] = useState()
    const { id } = use(params)
    const router = useRouter();
    const nameRef = useRef();
    const slugRef = useRef();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setfetchLoading] = useState(false);
    const [category, setCategory] = useState({});



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

        setLoading(true);

        client
            .put(`category/update/${id}`, payload)
            .then((response) => {
                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    nameRef.current.value = "";
                    slugRef.current.value = "";
                    router.push("/admin/category");
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


    async function getcategories() {
        setfetchLoading(true)
        try {

            const { data, meta } = await getcategoriesById(id)
            setCategory(data)
            setImage(`${meta.imageBaseUrl}/${data.image}`);


        } catch (error) {
            console.log(error);

        } finally {
            setfetchLoading(false)
        }
    }
    useEffect(() => {
        if (id) {
            getcategories();
        }
    }, [id]);


    if (fetchLoading) {
        return (
            <h2 className='h-screen flex justify-center items-center text-3xl font-bold '>Loading...</h2>
        )
    }
    return (
        <div className="flex items-center justify-center bg-gray-50 p-6 rounded-2xl">

            {/* Card */}
            <div className="w-full max-w-5xl mt-5 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl border border-gray-100 p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Edit Category
                    </h1>

                </div>

                {/* Form */}
                <form onSubmit={SubmitHandler} className="space-y-6">
                    <div className="flex items-center justify-between ">


                        {/* Name */}
                        <div className="w-[49%]">
                            <label className=" text-sm font-semibold mb-2 text-gray-700">
                                Category Name
                            </label>
                            <input
                                type="text"
                                defaultValue={category?.name}
                                onChange={(e) => createSlug(e.target.value)}
                                ref={nameRef}
                                placeholder="Enter category name"
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
                                defaultValue={category?.slug}
                                ref={slugRef}
                                readOnly
                                placeholder="enter-slug"
                                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500"
                            />


                        </div>
                    </div>


                    {/*  STATUS  */}
                    {/*<div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Status
                        </label>

                        <div className="flex gap-4 flex-wrap">

                            <label className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-sm">
                                <input type="checkbox" name="status" />
                                Active
                            </label>

                            <label className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-sm">
                                <input type="checkbox" name="is_home" />
                                Home
                            </label>

                            <label className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full text-sm">
                                <input type="checkbox" name="is_top" />
                                Top
                            </label>

                            <label className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full text-sm">
                                <input type="checkbox" name="is_popular" />
                                Popular
                            </label>

                        </div>
                    </div> */}


                    {/*  IMAGE  */}
                    <div>
                        <label className="text-sm font-semibold mb-2 text-gray-700">
                            Category Image
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
                        <img src={image} alt="" className='h-45 w-30 my-2 rounded-3xl' />

                        <p className="text-xs text-gray-400 mt-2">
                            Upload category thumbnail (optional)
                        </p>
                    </div>


                    {/* ye choose image ka another option hai */}
                    {/* <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Category Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            className="w-full min-h-25 flex items-center justify-center text-center border border-gray-200 rounded-xl px-4 py-6 cursor-pointer
                        file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 
                       file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200 transition"
                        />

                        <p className="text-xs text-gray-400 mt-1 text-center">
                            Upload category thumbnail (optional)
                        </p>
                    </div>   */}


                    {/* Buttons */}
                    <div className="flex  gap-4 pt-4 w-md">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-medium shadow-md hover:scale-105 transition duration-200"
                        >
                            {loading ? "update....." : "Edit Category"}
                        </button>

                        <Link href="/admin/category" className="flex-1">
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