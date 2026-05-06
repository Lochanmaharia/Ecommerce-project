
import { client } from "@/utils/helper";
import { cookies } from "next/headers";

const getProducts = async (query = {}) => {
    const filter = new URLSearchParams();
    if (query.id) filter.append("id", query.id)
    if (query.status) filter.append("status", query.status)
    if (query.limit) filter.append("limit", query.limit)
    if (query.category_slug) filter.append("category_slug", query.category_slug)
    if (query.brand_slug) filter.append("brand_slug", query.brand_slug)
    if (query.color_slug) filter.append("color_slug", query.color_slug)
    if (query.min_price) filter.append("min_price", query.min_price);
    if (query.max_price) filter.append("max_price", query.max_price);
    if (query.sort) filter.append("sort", query.sort);
    const response = await client.get(`product?${filter.toString()}`);
    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail")
    }
    return response.data

}

const getcategories = async (query = {}) => {
  
    const filter = new URLSearchParams();
    if (query.id) filter.append("id", query.id)
    if (query.status) filter.append("status", query.status)
    if (query.limit) filter.append("limit", query.limit)
    if (query.is_home) filter.append("is_home", query.is_home)
    const response = await client.get(`category?${filter.toString()}`);
    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail")
    }
    return response.data

}

const getbrands = async (query = {}) => {
    const filter = new URLSearchParams();
    if (query.id) filter.append("id", query.id)
    if (query.status) filter.append("status", query.status)
    if (query.limit) filter.append("limit", query.limit)
    if (query.is_home) filter.append("is_home", query.is_home)

    const response = await client.get(`brand?${filter.toString()}`);
    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail")
    }
    return response.data

}

const getcolors = async (query = {}) => {
    const filter = new URLSearchParams();
    if (query.id) filter.append("id", query.id)
    if (query.status) filter.append("status", query.status)
    if (query.limit) filter.append("limit", query.limit)

    const response = await client.get(`color?${filter.toString()}`);
    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail")
    }
    console.log(response.data, "response")
    return response.data

}
const getcategoriesById = async (id) => {
    const response = await client.get(`category/${id}`);

    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail");
    }

    return response.data
};

const getProductById = async (id) => {
    const response = await client.get(`product/${id}`);

    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail");
    }

    return response.data
};

const getMe = async () => {
    const cookieStore = await cookies();
    let token = cookieStore.get("jwt")?.value || null;
    if (!token) {
        return {user:null};
    }
    const response = await client.get("user/get", {
        headers: {
            Authorization: token
        }
    })
    if (!response.data.success) {
        throw new Error(response.data.message || "API Fail")
    }
    
    return response.data
    

}

export { getcategories, getcategoriesById, getbrands, getcolors, getProducts, getProductById,getMe };
















