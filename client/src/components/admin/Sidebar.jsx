'use client'
import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Link from 'next/link';
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { FaProductHunt, FaFirstOrderAlt } from "react-icons/fa";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { IoColorPaletteSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const pathname = usePathname();

    const items = [
        {
            name: "Dashboard",
            icons: <RiDashboardHorizontalLine />,
            path: "/admin"
        },
        {
            name: "Category",
            icons: <MdCategory />,
            path: "/admin/category"
        },
        {
            name: "Product",
            icons: <FaProductHunt />,
            path: "/admin/product"
        },
        {
            name: "Brand",
            icons:<RiCheckboxMultipleLine />,
            path: "/admin/brand"
        },
        {
            name: "Color",
            icons: <IoColorPaletteSharp />,
            path: "/admin/color"
        },
        {
            name: "Order",
            icons: <FaFirstOrderAlt />,
            path: "/admin/order"
        }
    ]
    return (
        <aside className={` ${open ? "w-64" : "w-20"} h-full flex flex-col bg-white shadow-2xl p-4 duration-100 sticky top-0`}>
            <div className="flex justify-between items-center">
                {
                    open && <h2 className='font-bold text-2xl text-[#ff7b00]'>Ishop Admin</h2>
                }
                <FaBarsStaggered className={`cursor-pointer ${open ? "" : "justify-center items-center"}`} onClick={() => setOpen(!open)} />
            </div>
            <nav className='flex-1 mt-10 space-y-3'>
                {
                    items.map((item, index) => {
                        return (
                            <Link key={index} href={item.path} className={`flex items-center gap-3 ${pathname === item.path ? "bg-[#ff7b00] text-white" : ""} text-md px-3 py-2 rounded-lg ${open ? "" : "justify-center items-center"} `}>
                                {item.icons}
                                {
                                    open && <span className='font-medium'>{item.name}</span>
                                }
                            </Link>
                        )

                    })
                }

            </nav>
        </aside>
    )
}
