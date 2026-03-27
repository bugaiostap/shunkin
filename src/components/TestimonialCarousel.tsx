"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface Review {
    id: number;
    name: string;
    message: string;
}
export default function TestimonialCarousel() {
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
        <div className="relative w-full  h-full mx-auto mt-[60px] pb-[92px] max-w-2xl">
            {/* Навигационные стрелки (сверху) */}
            <div className="absolute bottom-[0px] -translate-x-1/2 left-1/2 flex space-x-10">
                <button onClick={scrollPrev} className="w-[42px] h-[42px]  p-2  rounded-full border border-black">
                    <Image src="/images/icons/Arrow3.svg" unoptimized alt="Arrow Icon" width={32} height={32} />
                </button>
                <button onClick={scrollNext} className="w-[42px] h-[42px] rotate-180 p-2  rounded-full border border-black">
                    <Image src="/images/icons/Arrow3.svg" alt="Arrow Icon" unoptimized width={32} height={32} />
                </button>
            </div>

            {/* Карусель */}
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                    {!loading ? reviews.map((slide, index) => (
                        <div key={index} className="flex-none w-full  px-4 ">
                            <div className="  h-full text-black mt-5 w-full">
                                <p className="font-semibold text-[22px]">“</p>
                                <p className="text-md font-gotham font-light ">{slide.message}</p>
                                <p className="font-semibold text-end text-[22px]">“</p>
                                <p className="text-sm mt-20 text-center justify-center flex">— {slide.name}</p>
                            </div>
                        </div>
                    )) :
                        <p className="text-center text-white"></p>
                    }
                </div>
            </div>
        </div>
    );
}
