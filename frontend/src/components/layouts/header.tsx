"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";


const Header = () => {
    const [showAuth, setShowAuth] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const token = Cookies.get("accessToken");

        if (!token) return;

        axios.get(`${process.env.NEXT_PUBLIC_URL_API}/auth/info`, {
            headers: {
                Authorization: `Bearer ${atob(token)}`
            }
        })
            .then((res: any) => {

                setUserInfo(res.data);
            })
            .catch(() => {
                setUserInfo("");
            });

    }, [email]);

    useEffect(() => {
        console.log(email);
    })

    return (
        <div className="w-full h-14 px-20 z-20 fixed top-0 left-0 bg-white/30 backdrop-blur-md 
            border-b border-white/20">
            <div className="h-full flex gap-12 justify-end items-center">
                <Link
                    href={"/"}
                    className="relative group cursor-pointer hover:text-white">
                    Home
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                </Link>
                <div className="relative group cursor-pointer hover:text-white">
                    Discover
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                </div>
                <div className="relative group cursor-pointer hover:text-white">
                    About
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                </div>
                <div className="relative group cursor-pointer hover:text-white">
                    Contact us
                    <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
                </div>
                <div className="relative group cursor-pointer">

                    <div className="text-2xl hover:text-white">
                        <FaUserCircle />
                    </div>

                    <div className="absolute left-1/2 top-12
                                    -translate-x-1/2
                                    w-40 bg-transparent rounded-xl shadow-lg
                                    py-2 text-black
                                    border border-white/20
                                    opacity-0 invisible
                                    group-hover:opacity-100 group-hover:visible
                                    transition-all duration-300">

                        <div className="px-4 py-2 flex justify-center">
                            {userInfo ? (
                                <span className="text-white">{userInfo.userName}</span>
                            ) : (
                                <span className="relative inline-block cursor-pointer hover:text-white">
                                    <Link href={"/auth/signin"}>Signin</Link>
                                </span>
                            )}
                        </div>

                        <div className="px-4 py-2 flex justify-center">
                            {!email && (
                                <span className="relative inline-block cursor-pointer hover:text-white">
                                    <Link href={"/auth/signup"}>Signup</Link>
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </div>


    )
}

export default Header;