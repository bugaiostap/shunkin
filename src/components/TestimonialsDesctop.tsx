"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        image: "/images/house1.png", // Замените на свои изображения
        title: "Звернувшись до агентства shunkin.com.ua, я отримав якісний сервіс і професійний підхід. Агент уважно вислухав мої побажання, підібрав ідеальні варіанти житла та супроводжував угоду від початку до кінця.",
        // features: ["320 м², тераса 50 м², 12 соток", "4 спальні, 5 санвузлів", "вул. Набережна Перемоги, 112"],
    },
    {
        image: "/images/house1.png",
        title: "Довго шукали будинок біля води, але тільки тут знайшли ідеальне поєднання сучасного дизайну та затишку. Все оформили без зайвих проблем, сервіс на найвищому рівні!",
        // features: ["280 м², басейн, 10 соток", "5 спалень, 4 санвузли", "вул. Зеленого Гаю, 9"],
    },
];
interface Review {
    id: number;
    name: string;
    message: string;
}
export default function TestimonialCarouselDesktop() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect(); // Обновление индекса при загрузке
    }, [emblaApi]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch("/api/reviews");
            const data = await res.json();
            setReviews(data);
            setLoading(false);
        };

        fetchReviews();
    }, []);

    return (
        <div className="relative w-full  h-full mx-auto !mt-[80px] flex  max-w-6xl">
            {/* Навигационные стрелки (сверху) */}

            {/* Карусель */}
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                    {reviews.map((slide, index) => (
                        <div key={index} className="flex-none max-w-[600px] w-full  px-4 ">
                            <div className="  h-full text-black mt-5 w-full">
                                <p className="font-semibold text-[22px]">“</p>
                                <p className="text-[24px] font-gotham font-light ">{slide.message}</p>
                                <p className="font-semibold text-end text-[22px]">“</p>
                                <p className="text-[22px] mt-20 text-center justify-center flex">— {slide.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" items-center justify-center ml-[300px] flex space-x-[55px]">
                <button onClick={scrollPrev} className="w-[110px] h-[110px]  p-6  rounded-full border border-black">
                    <Image src="/images/icons/Arrow3.svg" unoptimized alt="Arrow Icon" width={60} height={32} />
                </button>
                <button onClick={scrollNext} className="w-[110px] h-[110px] rotate-180 p-6  rounded-full border border-black">
                    <Image src="/images/icons/Arrow3.svg" alt="Arrow Icon" unoptimized width={60} height={32} />
                </button>
            </div>
        </div>
    );
}
