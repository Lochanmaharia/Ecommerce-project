'use client'
import { useDispatch, useSelector } from "react-redux";
import { qtyChange } from "@/redux/features/cartSlice";
import Link from "next/link";

export default function CartUI() {
  const cart = useSelector((store) => store.cart);
  const dispacher = useDispatch()
  return (
    <div className="flex gap-10 p-10 bg-gray-100 min-h-screen">

      {/* LEFT SIDE */}
      <div className="flex-1 space-y-6">
        {cart?.items.map((item) => (
          <div key={item.id} className="flex gap-5 bg-white p-5 rounded-xl shadow">

            {/* Image Section */}
            <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center relative">
              <img src={item.thumbnail} className="w-28" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-red-500 font-bold text-xl mt-2"><span className="font-bold">₹/- </span>{item.finalPrice}</p>

              {/* Qty UI (static) */}
              <div className="flex items-center gap-4 mt-3 border w-fit px-3 py-1 rounded">
                <button onClick={() => dispacher(qtyChange({ id: item.id, flag: "dec" }))}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => dispacher(qtyChange({ id: item.id, flag: "inc" }))}>+</button>
              </div>

              <p className="text-green-600 text-sm mt-3">FREE SHIPPING</p>
              <p className="text-green-600 text-sm">{item.stock ? '✔ In stock' : 'out of stock'} </p>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-80 bg-white p-6 rounded-xl shadow border border-green-400 h-fit">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Sub Total:</span>
          <span>${cart.original_total}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Savings:</span>
          <span>${(cart.original_total - cart.final_total)}</span>
        </div>



        <hr className="my-3" />

        <div className="flex justify-between font-bold">
          <span>ORDER TOTAL:</span>
          <span>${cart.final_total}</span>
        </div>
        <Link href="/checkout">
          <button className="mt-5 w-full bg-teal-600 text-white py-3 rounded-lg">
            CHECKOUT
          </button>
        </Link>


      </div>

    </div>
  );
}