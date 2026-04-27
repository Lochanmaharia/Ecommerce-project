
import { getbrands } from "@/api/api-call";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import StatusBtn from "@/components/admin/Statusbtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
export const dynamic = "force-dynamic";

export default async function Brand() {
  let brands = [];
  let meta = {};

  try {
    const res = await getbrands();
    brands = res.data;
    meta = res.meta;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Brand Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all brands efficiently 🚀
          </p>
        </div>

        <Link href="/admin/brand/add">
          <button className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:scale-105 transition-all duration-200">
            <FaPlus size={16} />
            <span>Add Brand</span>
          </button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-5">Image</th>
              <th className="p-5">Name</th>
              <th className="p-5">Slug</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {
              brands.length == 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400">
                    🚫 No Brands Found
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr
                    key={brand._id}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >

                    {/* Image */}
                    <td className="p-4">
                      <img
                        src={`${meta.imageBaseUrl}/${brand.image}`}
                        alt={brand.name}
                        className="w-12 h-12 object-cover rounded-xl border shadow-sm"
                      />
                    </td>

                    {/* Name */}
                    <td className="p-5 font-semibold text-gray-800">
                      {brand.name}
                    </td>

                    {/* Slug */}
                    <td className="p-5 text-gray-500 text-sm">
                      {brand.slug}
                    </td>

                    {/* Status */}
                    <td className="p-5 flex flex-wrap gap-2">
                      <StatusBtn module="brand" value={brand.status} id={brand._id} field="status" />
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex justify-center gap-3">

                        <Link href={`/admin/brand/edit/${brand._id}`}>
                          <button className="bg-orange-100 p-2.5 rounded-xl text-orange-600 hover:bg-orange-200 hover:scale-110 transition duration-200 shadow-sm">
                            <FiEdit size={16} />
                          </button>
                        </Link>
                        {/* <DeleteBtn API={`brand/delete/${brand._id}`} /> */}
                        <DeleteBtn module="brand" id={brand._id} />


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