
'use client'
import { use } from 'react'
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/utils/helper";
import { notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { getProductById } from '@/api/api-call';
import { MdDeleteForever } from "react-icons/md";



export default function page({ params }) {
    const [baseUrl, setBaseUrl] = useState("");
    const [image, setImage] = useState()
    const { id } = use(params)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setfetchLoading] = useState(false);
    const [product, setProduct] = useState({});



    const SubmitHandler = (event) => {
        event.preventDefault();

        const payload = new FormData();

        console.log(event.target.image.files);

        for (let image of event.target.image.files) {
            payload.append("images", image);

        }


        setLoading(true);

        client
            .post(`product/addimages/${id}`, payload)
            .then((response) => {
                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    router.push("/admin/product");
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



    const removeImage = async (name) => {
        try {
            const response = await client.put(`product/remove-image/${id}`, { image_name: name });

            notify(response.data.message, response.data.success);

            if (response.data.success) {
                await getProduct();
            }

        } catch (err) {
            console.log(err);
            const message =
                err?.response?.data?.message || "Internal Server Error";
            notify(message, false);
        }
    };


    async function getProduct() {
        setfetchLoading(true)
        try {

            const { data, meta } = await getProductById(id)
            setProduct(data)
            setBaseUrl(meta.imageBaseUrl);


        } catch (error) {
            console.log(error);

        } finally {
            setfetchLoading(false)
        }
    }
    useEffect(
        () => {
            getProduct()
        },
        [id]
    )


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
                        Add Images
                    </h1>

                </div>

                {/* Form */}
                <form onSubmit={SubmitHandler} className="space-y-6">


                    {/*  IMAGE  */}
                    <div>
                        <label className="text-sm font-semibold mb-2 text-gray-700">
                            Image
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
                                multiple
                                name="image"
                                accept="image/"
                                className=" mt-3 ml-26"
                            />
                        </div>
                        <div className='flex flex-wrap gap-4 mt-4'>
                            {
                                product?.images?.map((image) => {
                                    return (
                                        <>

                                            <img src={`${baseUrl}/${image}`} alt="Missing"
                                                className='w-30 h-30 object-cover rounded-lg mt-4' />
                                            <MdDeleteForever size={15} onClick={() => removeImage(image)} className='bg-red-400 relative top-5 -left-10.5 
                                            object-fill rounded-full p-1 cursor-pointer w-auto h-6 z-50'key={image} />

                                        </>
                                    )
                                })
                            }
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Upload category thumbnail (optional)
                        </p>
                    </div>




                    {/* Buttons */}
                    <div className="flex  gap-4 pt-4 w-md">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-medium shadow-md hover:scale-105 transition duration-200"
                        >
                            {loading ? "update....." : "Add Images"}
                        </button>

                        <Link href="/admin/product" className="flex-1">
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