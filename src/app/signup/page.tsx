"use client"
import axios from 'axios';
import Image from 'next/image';
import { Input } from "antd";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {};

const SignUp = (props: Props) => {
    const router = useRouter();

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const HandleSignup = async () => {
        console.log(username, email, password);
        try {
            const res = await axios.post("api/auth/signup", { username: username, email: email, password: password });
            router.push("/login");
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="bg-white flex flex-col lg:flex-row justify-center items-center h-screen p-4">
            {/* Left: Image */}
            <div className="lg:w-1/2 w-full lg:block hidden p-5">
                <Image
                    src="https://pethelpful.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:eco%2Cw_1200%2Cx_459%2Cy_262/MjA1MDAwNjkwMDk3OTg5Mzcy/shutterstock_97912964.jpg"
                    alt="Placeholder Image"
                    className='rounded-lg shadow-lg border border-gray-300'
                    width={600}
                    height={800}
                    objectFit="cover"
                />
            </div>
            {/* Right: Login Form */}
            <div className="flex flex-col items-center lg:p-36 md:p-24 sm:p-20 p-8 w-full lg:w-1/2">
                <div className='flex flex-col items-center justify-center mb-10'>
                    <h1 className="text-4xl lg:text-5xl font-semibold mb-4">Sign Up</h1>
                    <h1>Already a member? <span><a href="/login" className="hover:underline text-violet-600">Log In</a></span></h1>
                </div>
                <div className="w-full max-w-md">
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 mb-1">Username</label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            size='large'
                            className="w-full text-black border border-gray-400 rounded-lg py-2 px-3 "
                            autoComplete="off"
                            onChange={(e) => { setusername(e.target.value); }}
                            value={username}
                        />
                    </div>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            size='large'
                            className="w-full text-black border border-gray-400 rounded-lg py-2 px-3 "
                            autoComplete="off"
                            onChange={(e) => { setemail(e.target.value); }}
                            value={email}
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            size='large'
                            className="w-full text-black border border-gray-400 rounded-lg py-2 px-3 "
                            autoComplete="off"
                            onChange={(e) => { setpassword(e.target.value); }}
                            value={password}
                        />
                    </div>
                    <button
                        onClick={HandleSignup}
                        className="w-full border border-violet-500 text-violet-500 bg-white py-2 mt-5 px-4 rounded-lg hover:bg-violet-600 hover:text-white transition duration-200"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
