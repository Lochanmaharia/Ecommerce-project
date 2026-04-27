'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTocart, qtyChange } from '@/redux/features/cartSlice'


export default function AddToCartButton({ product, imageBaseUrl }) {
    const cart = useSelector((store) => store.cart);
    const cartItem = cart?.items.find((item) => item.id == product._id)
    
    const dispacher = useDispatch()
    return (
        <div className="p-3 pt-0">
            {
                cartItem ?
                    <div className='flex gap-2 '>
                        <button onClick={() => dispacher(qtyChange({ id: product._id, flag: "inc" }))} className="bg-teal-500  py-1 px-4 text-white rounded-lg text-sm font-medium" >+ </button>
                        <h2>{cartItem.qty || 0}</h2>
                        <button onClick={() => dispacher(qtyChange({ id: product._id, flag: "dec" }))} className="bg-teal-500  py-1 px-4 text-white rounded-lg text-sm font-medium" >-</button>

                    </div>
                    :
                    <button
                        onClick={() => {
                            dispacher(addTocart(
                                {
                                    name: product?.name,
                                    price: product.price,
                                    finalPrice: product.finalPrice,
                                    id: product._id,
                                    discount: product.discount,
                                    thumbnail: imageBaseUrl,
                                    stock: product.stock,
                                    qty: 1
                                }
                            ))
                        }}
                        disabled={!product.stock}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition
                        ${product.stock
                                ? "bg-teal-500 text-white hover:bg-gray-800"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                    >
                        {product.stock ? "Add To Cart" : "Unavailable"}
                    </button>
            }



        </div>
    )
}