
import { getcolors } from "@/api/api-call";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import StatusBtn from "@/components/admin/Statusbtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
export const dynamic = "force-dynamic";

export default async function Color() {
  let categories = [];


  try {
    const res = await getcolors();
    categories = res.data;

  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Color Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all colors efficiently 🚀
          </p>
        </div>

        <Link href="/admin/color/add">
          <button className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:scale-105 transition-all duration-200">
            <FaPlus size={16} />
            <span>Add Color</span>
          </button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">

          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
            <tr>
              {/* <th className="p-5">Image</th> */}
              <th className="p-5">Name</th>
              <th className="p-5">Slug</th>
              <th className="p-5">Color Code</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {
              categories.length == 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400">
                    🚫 No Color Found
                  </td>
                </tr>
              ) : (
                categories.map((color) => (
                  <tr
                    key={color._id}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >

                    {/* Name */}
                    <td className="p-5 font-semibold text-gray-800">
                      {color.name}
                    </td>

                    {/* Slug */}
                    <td className="p-5 text-gray-500 text-sm">
                      {color.slug}
                    </td>
                    {/* color code  */}
                    <td className="p-5 text-gray-500 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.color_code }}></div>
                      {color.color_code}
                    </td>

                    {/* Status */}
                    <td className="p-5 flex flex-wrap gap-2">
                      <StatusBtn module="color" value={color.status} id={color._id} field="status" />
                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex justify-center gap-3">

                        <Link href={`/admin/color/edit/${color._id}`}>
                          <button className="bg-orange-100 p-2.5 rounded-xl text-orange-600 hover:bg-orange-200 hover:scale-110 transition duration-200 shadow-sm">
                            <FiEdit size={16} />
                          </button>
                        </Link>
                        <DeleteBtn module="color" id={color._id} />

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