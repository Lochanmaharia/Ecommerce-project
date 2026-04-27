import { getProducts } from "@/api/api-call";
import ProductCard from "@/components/user/ProductCard";

export default async function Page({ params, searchParams }) {
    const category_promise = await params;
    const search_promise = await searchParams;
    const brand_slug = search_promise.brand_slug || null
    const category_slug = category_promise.slug || null
    const color_slug = search_promise.color_slug || null

    const product_response = await getProducts({ status: true, category_slug, brand_slug, color_slug });

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