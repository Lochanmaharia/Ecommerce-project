"use client";
import React from "react";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";

export default function Header() {
    return (
        <div className=" sticky w-full h-17.5 bg-white border-b border-gray-200 flex items-center justify-between px-8">

            {/* Left */}
            <div className="flex items-center gap-6">
                <button className="text-gray-600 text-xl">
                    <FiMenu />
                </button>

                <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
                    Dashboard
                </h1>
            </div>

            {/* Center Search */}
            <div className="flex-1 flex justify-center px-6">
                <div className="relative w-full max-w-xl">
                    <FiSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:bg-white transition"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">

                {/* Notification */}
                <div className="relative cursor-pointer">
                    <FiBell className="text-xl text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-px rounded-full">
                        3
                    </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-9 h-9 bg-gray-200 text-gray-700 flex items-center justify-center rounded-full font-semibold">
                        L
                    </div>

                    <div className="hidden sm:block leading-tight">
                        <p className="text-sm font-medium text-gray-800">
                            Admin
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}