"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ImageSlider() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-6">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="rounded-lg shadow-lg"
            >
                {/* Slides */}
                <SwiperSlide>
                    <img
                        src="/images/1852789.webp"
                        alt="Imagen 1"
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/1691439752922.jpeg"
                        alt="Imagen 2"
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/primer-plano-manos-contador-contando-calculadora-scaled.jpg"
                        alt="Imagen 3"
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
