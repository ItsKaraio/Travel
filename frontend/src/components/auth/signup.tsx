"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");


    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const variants = {
        hiddenRight: { x: 300, opacity: 0 },
        hiddenLeft: { x: -300, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    const handleRegister = async () => {
        try {
            const fullName = firstName + " " + lastName;
            const birthday = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/register`, {
                userName: username,
                email: email,
                password: password,
                fullName: fullName,
                address: address,
                phoneNumber: phoneNumber,
                birthday: birthday
            });

            toast.success("Registration successful");



        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log("FULL ERROR:", err.response);

                console.log("DATA:", err.response?.data);

                console.log("MESSAGE:", err.response?.data?.message);

                toast.error(err.response?.data?.message || "Lỗi rồi!");
            } else {
                console.log("UNKNOWN ERROR:", err);
            }
        }
    }

    return (
        <div className="relative w-full h-screen">
            <Image src={"/assets/images/signin/signinbackground.jpg"}
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
                <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial={{ x: 300, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit="hiddenLeft"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="w-80 p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                                <h1 className="text-center text-3xl font-mono font-semibold text-white mb-4">
                                    SIGN UP
                                </h1>
                                <div className="mb-4">
                                    <label className="text-white text-sm">User name</label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-white text-sm">Email</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-white text-sm">Password</label>
                                    <input
                                        type="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                    />
                                </div>
                                <div
                                    onClick={() => setStep(2)}
                                    className="w-full h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex justify-center items-center text-white cursor-pointer"
                                >

                                    Continue
                                    <FaArrowRightLong className="ml-2" />
                                </div>

                                <div className="flex items-center gap-4 w-full my-6">
                                    <hr className="flex-1 border-white/50" />
                                    <span className="text-white text-sm">OR</span>
                                    <hr className="flex-1 border-white/50" />
                                </div>
                                <div className="h-8 w-full rounded-lg mb-4 flex justify-center items-center gap-2 cursor-pointer hover:bg-white/30">
                                    <FcGoogle className="text-2xl" />
                                    <span className="text-white"> Sign up with Google</span>
                                </div>
                                <div className="text-white text-sm text-center">
                                    <span>Already have an account? <Link href={"/auth/signin"} className="underline cursor-pointer">Sign in</Link></span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* STEP 2 */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial={{ x: 300, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit="hiddenLeft"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="w-80 p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg">
                                <h1 className="text-center text-3xl font-mono font-semibold text-white mb-4">
                                    SIGN UP
                                </h1>

                                <div className="flex gap-2 mb-4">
                                    <div>
                                        <label className="text-white text-sm">First name</label>
                                        <input
                                            value={firstName}
                                            onChange={(e) => { setFirstName(e.target.value) }}
                                            className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-white text-sm">Last name</label>
                                        <input
                                            value={lastName}
                                            onChange={(e) => { setLastName(e.target.value) }}
                                            className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="text-white text-sm">Phone number</label>
                                    <input
                                        value={phoneNumber}
                                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                                        className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="text-white text-sm">Address</label>
                                    <input
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        className="w-full h-8 rounded-lg text-sm bg-white/80 cursor-pointer outline-cyan-400 px-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="text-white text-sm">Birthday</label>

                                    <div className="flex gap-2">

                                        {/* DAY */}
                                        <select
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                            className={`w-full h-8 rounded-lg px-2 bg-white/80 text-sm cursor-pointer outline-cyan-400 ${day ? "text-black" : "text-gray-400"
                                                }`}
                                        >
                                            <option value="" disabled hidden>DD</option>
                                            {[...Array(31)].map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>

                                        {/* MONTH */}
                                        <select
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            className={`w-full h-8 rounded-lg px-2 bg-white/80 text-sm cursor-pointer outline-cyan-400 ${month ? "text-black" : "text-gray-400"
                                                }`}
                                        >
                                            <option value="" disabled hidden>MM</option>
                                            {[...Array(12)].map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>

                                        {/* YEAR */}
                                        <select
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className={`w-full h-8 rounded-lg px-2 bg-white/80 text-sm cursor-pointer outline-cyan-400 ${year ? "text-black" : "text-gray-400"
                                                }`}
                                        >
                                            <option value="" disabled hidden>YYYY</option>
                                            {[...Array(100)].map((_, i) => {
                                                const y = new Date().getFullYear() - i;
                                                return <option key={i} value={y}>{y}</option>;
                                            })}
                                        </select>

                                    </div>
                                </div>
                                <div
                                    onClick={() => setStep(1)}
                                    className="w-full h-8 mb-4 bg-gray-400 hover:bg-gray-500 rounded-lg flex justify-center items-center text-white cursor-pointer"
                                >
                                    <FaArrowLeftLong className="mr-2" />
                                    Back
                                </div>

                                <div
                                    onClick={handleRegister}
                                    className="w-full h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex justify-center items-center text-white cursor-pointer">
                                    Sign up
                                </div>

                                <div className="flex items-center gap-4 w-full my-6">
                                    <hr className="flex-1 border-white/50" />
                                    <span className="text-white text-sm">OR</span>
                                    <hr className="flex-1 border-white/50" />
                                </div>
                                <div className="h-8 w-full rounded-lg mb-4 flex justify-center items-center gap-2 cursor-pointer hover:bg-white/30">
                                    <FcGoogle className="text-2xl" />
                                    <span className="text-white"> Sign up with Google</span>
                                </div>
                                <div className="text-white text-sm text-center">
                                    <span>Already have an account? <Link href={"/auth/signin"} className="underline cursor-pointer">Sign in</Link></span>
                                </div>
                            </div>

                        </motion.div>
                    )}

                </AnimatePresence>
            </div >
        </div >
    )
}

export default Signup;