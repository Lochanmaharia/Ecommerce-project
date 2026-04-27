import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product, imageBaseUrl }) => {

    return (
        <div className="relative bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden group">

            {/* DISCOUNT */}
            {product.discount_percentage && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded z-10">
                    {product.discount_percentage}% OFF
                </span>
            )}

            {/* IMAGE */}
            <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img src={imageBaseUrl}
                    alt={product.name}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-110"  
                />
            </div>

            {/* CONTENT */}
            <div className="p-3 space-y-1">

                <h3 className="text-sm font-medium text-gray-800">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                        ₹{product.finalPrice}
                    </span>

                    <span className="text-xs line-through text-gray-400">
                        ₹{product.price}                    
                    </span>
                </div>


            </div>

            <AddToCartButton product={product} imageBaseUrl={imageBaseUrl} />

        </div>
    );
};

export default ProductCard;