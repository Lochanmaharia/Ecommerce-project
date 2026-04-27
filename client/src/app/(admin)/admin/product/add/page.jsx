"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getcategories, getbrands, getcolors } from "@/api/api-call";
import Select from "react-select";
import { notify, client } from "@/utils/helper";
import { Editor } from 'primereact/editor';





const ProductFormUI = () => {
    const [text, setText] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectColors, setSelectColors] = useState([])
    const nameRef = useRef();
    const slugRef = useRef();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);


    function colorSelect(selected) {
        const selectItem = selected ? selected.map((c) => c.value) : [];
        setSelectColors(selectItem);
    }




    const getData = async () => {
        const [catRes, brandRes, colorRes] = await Promise.all([
            getcategories(),
            getbrands(),
            getcolors()
        ]);
        setCategories(catRes?.data?.map((cat) => ({ name: cat.name, value: cat._id })) || []);
        setBrands(brandRes?.data?.map((brands) => ({ name: brands.name, value: brands._id })) || []);
        setColors(colorRes?.data?.map((colors) => ({ name: colors.name, value: colors._id })) || []);

    }

    useEffect(
        () => {
            getData()
        },
        []
    )

    // console.log(categories);



    function createSlug() {
        let catSlug = nameRef.current.value;

        let slug = catSlug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        slugRef.current.value = slug;
    }


    // price calculated

    const [form, setForm] = useState({
        price: "",
        discount: "",
        finalPrice: ""
    });

    const handlePrice = (key, value) => {
        const updated = { ...form, [key]: value };

        const price = parseFloat(updated.price) || 0;
        const discount = parseFloat(updated.discount) || 0;

        updated.finalPrice = Math.round(price - (price * discount) / 100);

        setForm(updated);
    };

    const SubmitHandler = (event) => {
        event.preventDefault();
        const payload = new FormData();
        payload.append("thumbnail", event.target.thumbnail.files[0]);
        payload.append("name", nameRef.current.value);
        payload.append("slug", slugRef.current.value);
        payload.append("price", event.target.price.value);
        payload.append("discount", event.target.discount.value);
        payload.append("finalPrice", event.target.finalPrice.value);
        payload.append("color_ids", JSON.stringify(selectColors));
        payload.append("short_description", event.target.short_description.value);
        payload.append("long_description", text);
        payload.append("category_id", selectedCategory?.value);
        payload.append("brand_id", selectedBrand?.value);



        setLoading(true);

        client
            .post("product/create", payload)
            .then((response) => {
                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    nameRef.current.value = "";
                    slugRef.current.value = "";
                    event.target.reset();
                    router.push("/admin/product");
                    router.refresh();
                }
            })
            .catch((err) => {
                console.log(err);
                const message =
                    err?.response?.data?.message || "Internal Server Error";
                notify(message, false);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <form onSubmit={SubmitHandler} className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    ref={nameRef}
                    placeholder="Enter product name"
                    onChange={createSlug}
                    className="input"
                />
            </div>

            {/* Slug */}
            <div>
                <label className="block mb-1 font-semibold">Slug</label>
                <input
                    type="text"
                    placeholder="Auto generated slug"
                    readOnly
                    ref={slugRef}
                    className="input bg-gray-100"
                />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">
                    Short Description
                </label>
                <textarea
                    name="short_description"
                    placeholder="Enter short description"
                    className="input"
                />
            </div>

            {/* Long Description */}
            <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">
                    Long Description
                </label>
                <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />

                {/* <textarea
                    name="long_description"
                    placeholder="Enter long description"
                    className="input"
                /> */}
            </div>

            {/* Price Section */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                    <label className="block mb-1 font-semibold">
                        Original Price
                    </label>
                    <input
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        className="input"
                        onChange={(e) =>
                            handlePrice("price", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Discount %
                    </label>
                    <input
                        name="discount"
                        type="number"
                        placeholder="Enter discount"
                        className="input"
                        onChange={(e) =>
                            handlePrice("discount", e.target.value)
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Final Price
                    </label>
                    <input
                        type="text"
                        name="finalPrice"
                        placeholder="Auto calculated"
                        value={form.finalPrice}
                        readOnly
                        className="input bg-gray-100"
                    />
                </div>

            </div>


            {/* Select Section */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                    <label className="block mb-1 font-semibold">
                        Category
                    </label>
                    <Select
                        name="category"
                        onChange={(e) => setSelectedCategory(e)}
                        className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500" options={
                            categories.map((cat) => (
                                { value: cat.value, label: cat.name }
                            ))
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Brand
                    </label>
                    <Select
                        name="brand"
                        onChange={(e) => setSelectedBrand(e)}
                        className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500" options={
                            brands.map((cat) => (
                                { value: cat.value, label: cat.name }
                            ))
                        }
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">
                        Colors
                    </label>
                    <Select
                        isMulti
                        onChange={colorSelect}
                        closeMenuOnSelect={false}
                        className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-500" options={
                            colors.map((cat) => (
                                { value: cat.value, label: cat.name }
                            ))
                        }
                    />
                </div>
            </div>


            {/* Image */}
            <div className="md:col-span-2">
                <label className="block mb-1 font-semibold">
                    Thumbnail Image
                </label>
                <input
                    type="file"
                    name="thumbnail"
                    className="input"

                />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-right">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Submit Product
                </button>
            </div>

        </form>
    );
};

export default ProductFormUI;