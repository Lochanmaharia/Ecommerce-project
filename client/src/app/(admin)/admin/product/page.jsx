
import { getProducts } from "@/api/api-call";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import Link from "next/link";
import StatusBtn from "@/components/admin/Statusbtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ViewBtn from "@/components/admin/ViewButton";
export const dynamic = "force-dynamic";

export default async function ProductView() {
    let products = [];
    let meta = {};

    try {
        const res = await getProducts();
        products = res.data;
        meta = res.meta;
    } catch (error) {
        console.log(error, "error in fetching products");
    }
    // console.log(products);


    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Product Management
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Manage all products efficiently 🚀
                    </p>
                </div>

                <Link href="/admin/product/add">
                    <button className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:scale-105 transition-all duration-200">
                        <FaPlus size={16} />
                        <span>Add Product</span>
                    </button>
                </Link>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">

                    {/* Table Head */}
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="p-5">Thumbnail</th>
                            <th className="p-5">Name</th>
                            <th className="p-5">Category</th>
                            <th className="p-5">Status</th>
                            <th className="p-5 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {
                            products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-8 text-gray-400">
                                        🚫 No Product Found
                                    </td>
                                </tr>
                            ) : (
                                products.map((prod) => (
                                    <tr
                                        key={prod._id}
                                        className="border-t hover:bg-gray-50 transition duration-200"
                                    >

                                        {/* Image */}
                                        <td className="p-4">
                                            <img
                                                src={`${meta.imageBaseUrl}/${prod.thumbnail}`}
                                                alt="image"
                                                className="w-12 h-12 object-cover rounded-xl border shadow-sm"
                                            />
                                        </td>

                                        {/* Name */}
                                        <td className="p-5 font-semibold text-gray-800">
                                            {prod.name}
                                        </td>

                                        {/* Slug */}
                                        <td className="p-5 text-gray-500 text-sm">
                                            {prod?.category_id?.name || "No Category"}</td>

                                        {/* Status */}
                                        <td className="p-5 flex flex-wrap gap-2">
                                            <StatusBtn module="product" value={prod.status} id={prod._id} field="status" />
                                        </td>

                                        {/* Actions */}
                                        <td className="p-5">
                                            <div className="flex justify-center gap-3">

                                                <Link href={`/admin/product/edit/${prod._id}`}>
                                                    <button className="bg-orange-100 p-2.5 rounded-xl text-orange-600 hover:bg-orange-200 hover:scale-110 transition duration-200 shadow-sm">
                                                        <FiEdit size={16} />
                                                    </button>
                                                </Link>

                                                <Link href={`/admin/product/addimages/${prod._id}`}>
                                                    <button className="bg-orange-100 p-2.5 rounded-xl text-orange-600 hover:bg-orange-200 hover:scale-110 transition duration-200 shadow-sm">
                                                        <FaImages size={16} />
                                                    </button>
                                                </Link>

                                                {/* <DeleteBtn API={`product/delete/${prod._id}`}/> */}
                                                <DeleteBtn module="product" id={prod._id} />

                                                <ViewBtn prod={prod} />

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}