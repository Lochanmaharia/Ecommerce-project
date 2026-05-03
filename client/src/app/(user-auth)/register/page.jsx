'use client'

import React, { useState } from "react";
import Link from "next/link";
import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: ""
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
            .post("user/register", form)
            .then((response) => {
                const userEmail = form.email;

                notify(response.data.message, response.data.success);
                if (response.data.success) {
                    console.log(response.data)
                    setForm({
                        name: "",
                        email: "",
                        password: ""
                    })
                    router.push(`/verify-otp?email=${userEmail}`);
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
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">

            <div className="backdrop-blur-lg bg-white/70 p-8 rounded-3xl shadow-xl w-full max-w-md border border-white/40">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              transition duration-200 bg-white/80"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              transition duration-200 bg-white/80"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-purple-400 
              transition duration-200 bg-white/80"
                        />
                    </div>

                    {/* Button */}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-blue-500 to-purple-500 
            hover:from-blue-600 hover:to-purple-600 
            transition duration-300 shadow-md"
                    >
                        {loading ? "wait....." : "Register"}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-5">
                    Already have an account?
                    <Link href="/login">
                        <span className="text-blue-600 cursor-pointer ml-1 hover:underline">
                            Login
                        </span>
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;