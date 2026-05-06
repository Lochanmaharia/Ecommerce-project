'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client, notify } from "@/utils/helper";

const Login = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const cartItems = JSON.parse(localStorage.getItem("cart")) || null;
    const Items = cartItems?.items || [];
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        client
            .post("user/login", form)
            .then(async (response) => {
                console.log(response.data.data.email, "email")
                notify(response.data.message, response.data.success);
                if (response.data.success) {

                    // setForm({
                    //     email: "",
                    //     password: ""
                    // })
                    try {
                        const cartRes = await client.post("cart/sync", {
                            localCart: JSON.stringify(Items)
                        })
                        const cartData = cartRes.data?.cart;
                        console.log(cartData)
                        let final_total = 0;
                        let original_total = 0;
                        const items = cartData?.map((item) => {
                            const { name, _id, original_price, final_price, discount_percentage, price, thumbnail, stock } = item.productId
                            final_total += (final_price * item.qty)
                            original_total += (original_price * item.qty)
                            return {
                                name, _id, original_price, final_price, discount_percentage, price, thumbnail: cartRes.data.imageBaseUrl + thumbnail, stock, qty: item.qty
                            }
                        })

                        localStorage.setItem("cart", JSON.stringify({
                            final_total,
                            original_total,
                            items
                        }))
f
                        router.push("/")

                    } catch (error) {
                        console.log(error)
                    }

                    router.push("/");
                }
            })
            .catch((err) => {
                const message =
                    err?.response?.data?.message || "Internal server error";
                notify(message, false);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    return (
        <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">

            <div className="backdrop-blur-lg bg-white/70 p-8 rounded-3xl shadow-xl w-full max-w-md border border-white/40">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-purple-400 
              transition duration-200 bg-white/80"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              transition duration-200 bg-white/80"
                        />
                    </div>

                    {/* Extra Options */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-blue-500" />
                            Remember me
                        </label>
                        <span className="text-blue-600 cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-purple-500 to-blue-500 
            hover:from-purple-600 hover:to-blue-600 
            transition duration-300 shadow-md"
                    >
                        Login
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center flex text-sm text-gray-600 mt-5">
                    Don’t have an account?
                    <Link href="/register">
                        <div className="text-purple-600 cursor-pointer ml-1 hover:underline">
                            Register
                        </div>
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;