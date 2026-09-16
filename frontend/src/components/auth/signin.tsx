"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";


const Signin = () => {

    const router = useRouter();
    const [userName, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, {
                userName,
                email,
                password
            });

            const role = res.data.user.role;

            toast.success("Log in successfully!");
            if (role === "admin") {
                Cookie.set('accessToken', btoa(res.data.accessToken), { expires: 1 / 48 });
                // router.push("/admin/dashboard");
            } else {
                Cookie.set('accessToken', btoa(res.data.accessToken), { expires: 1 / 48 });
                router.push("/");
            }


        } catch (err) {
            toast.error("Please log in again!");
        }

    }


    return (
        <div className="relative w-full h-screen">
            <Image src={"https://res.cloudinary.com/dllazmk3a/image/upload/v1776448447/signinbackground.jpg"}
                width={2000}
                height={2000}
                alt="Background"
                className="w-full h-screen object-cover" />
            <div className="w-full h-screen bg-gray-600/30 absolute inset-0 z-2"></div>
            <div className="absolute inset-0 z-5 flex flex-col items-start justify-center pl-40 mb-4">
                <div className="text-4xl text-white font-mono mb-6">Travel</div>
                <div className="text-8xl font-semibold font-mono text-white mb-4">
                    EXPLORE <br /> HORIZONS
                </div>
                <div className="text-lg text-white mb-4">
                    When Your Dream Destinations Become Reality.
                </div>
                <div className="text-sm text-white">
                    Embark on a journey where very corner of the world is within your reach.
                </div>
            </div>
            <div className="absolute inset-0 z-5 flex items-center justify-end pr-40 overflow-hidden">
                <motion.div
                    initial={{ x: 300, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="">
                        <div className="w-80 p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                            <h1 className="text-center text-3xl font-mono font-semibold text-white">SIGN IN</h1>
                            <label className="text-white text-sm">Email</label>
                            <div className="mt-1 mb-4">
                                <input type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2" />
                            </div>
                            <label className="text-white text-sm">Password</label>
                            <div className="mt-1 mb-4">
                                <input type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2" />
                            </div>
                            <div className="flex justify-end mb-4">
                                <Link href={""}
                                    className="text-sm underline text-white">
                                    Forgot password?
                                </Link>
                            </div>
                            <div
                                onClick={handleLogin}
                                className="w-full h-8 mb-6 bg-blue-500 rounded-lg flex justify-center items-center text-white text-sm cursor-pointer hover:bg-blue-600" >
                                SIGN IN
                            </div>
                            <div className="flex items-center gap-4 w-full my-6">
                                <hr className="flex-1 border-white/50" />
                                <span className="text-white text-sm">OR</span>
                                <hr className="flex-1 border-white/50" />
                            </div>
                            <div className="h-8 w-full rounded-lg mb-4 flex justify-center items-center gap-2 cursor-pointer hover:bg-white/30">
                                <FcGoogle className="text-2xl" />
                                <span className="text-white"> Sign in with Google</span>
                            </div>
                            <div className="text-white text-sm text-center">
                                <span>Are you new? <Link href={"/auth/signup"} className="underline cursor-pointer">Create an Account</Link></span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div >
        </div>

    )
}

export default Signin;