import { getProducts } from "@/api/api-call";
import ProductCard from "@/components/user/ProductCard";

export default async function Page({ searchParams }) {
    const search_promise = await searchParams;
    const brand_slug = search_promise.brand_slug || null;
    const color_slug = search_promise.color_slug || null;
    const min_price = search_promise.min_price || null;
    const max_price = search_promise.max_price || null;
    const sort = search_promise.sort || null;
    const product_response = await getProducts({ status: true, brand_slug, color_slug, min_price, max_price, sort });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {product_response?.data.map((prod) => {
                return (
                    <ProductCard
                        key={prod._id}
                        product={prod}
                        imageBaseUrl={product_response?.meta?.imageBaseUrl + prod.thumbnail}
                        user={null}
                    />
                )
            })}

        </div>
    );
}