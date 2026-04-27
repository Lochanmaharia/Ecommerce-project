'use client'
import React from 'react'
import { FaEye } from "react-icons/fa";
import { useState } from 'react';


export default function ViewButton({prod}) {
  const [toggle, setToggle] =useState(false);
  return (
    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 hover:bg-blue-200 hover:scale-110 transition duration-200 shadow-sm">
      <FaEye onClick={()=> setToggle(!toggle)} />
        {/* {
          toggle && <Overlay prod={prod} onclose={()=> setToggle(false)} />
        }     */}
    </div>
  )
}

// function Overlay({ onclose ,prod }) {
//   return (
//     <div className=" fixed bottom-0 left-0 w-full p-6 bg-amber-600">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sapiente reiciendis vero cupiditate dolorum, nulla 
//     </div>
//   );
// }


