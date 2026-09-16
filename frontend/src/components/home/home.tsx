"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";


const Home = () => {
    const slides = [
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448688/japanslide.jpg", name: "Japan" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448691/koreaslide.jpg", name: "Korea" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448707/taiwanslide.jpg", name: "Taiwan" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448701/shanghaislide.jpg", name: "Shanghai" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448683/chinaslide.jpg", name: "China" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448694/malaysiaslide.jpg", name: "Malaysia" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448704/sysneyslide.jpg", name: "Sydney" },
        { img: "https://res.cloudinary.com/dllazmk3a/image/upload/v1776448685/indonesiaslide.jpg", name: "Indonesia" },
    ];
    return (
        <div className="">
            <div className="relative">
                <div className="absolute z-5 w-full h-screen bg-gray-800/40">
                </div>
                <Image width={2000}
                    height={2000}
                    alt="Background"
                    src={"https://res.cloudinary.com/dllazmk3a/image/upload/v1776448711/backgroundhome.jpg"}
                    className="w-full h-screen object-cover" />
                <div className="absolute inset-0 z-10 flex items-center justify-between px-10">
                    <div className="">
                        <p className="text-5xl text-white font-semibold italic font-mono">"Your journey begins here"</p>
                        <div className="py-5 w-200 px-10 ">
                            <p className="text-sm text-white">Welcome to our travel website, where every journey becomes an unforgettable experience. We help you discover beautiful destinations, explore different cultures, and create memories that last a lifetime. Whether you are looking for adventure, relaxation, or new discoveries, your next journey begins here.</p>
                        </div>
                        <div className="px-10">
                            <div className="w-60 h-10 flex justify-center items-center bg-transparent border border-white/50 rounded-2xl text-white text-xl font-mono
                            hover:bg-white hover:text-black cursor-pointer hover:italic">
                                Let's get started
                            </div>
                        </div>

                    </div>
                    <div className="w-170">
                        <Swiper
                            modules={[Autoplay, FreeMode]}
                            slidesPerView="auto"
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                            }}
                            speed={4000}
                            grabCursor={true}
                            className="w-full"
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide key={index} className="w-50!">
                                    <div className="relative rounded-[30px] overflow-hidden ">

                                        <img
                                            src={slide.img}
                                            className="w-full h-80 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-b from-gray-800/10  to-gray-500/50"></div>
                                        <div className="absolute bottom-4 left-5 text-white">
                                            <h3 className="text-2xl font-semibold">
                                                {slide.name}
                                            </h3>
                                        </div>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home;