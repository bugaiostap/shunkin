"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
    id: number;
    title: string;
    area: string;
    rooms: string;
    address: string;
    offer: string;
    images: string[];
}
export default function CarouselDesktop() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch("/api/slides");
                if (!res.ok) throw new Error("Ошибка загрузки данных");
                const data = await res.json();
                setSlides(data);
            } catch (err) {
                setError("Не удалось загрузить слайды.");
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
    const openModal = (slide: any) => {
        setSelectedSlide(slide);
        setModalOpen(true);
    };
    const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({ loop: true });
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect(); // Обновление индекса при загрузке
    }, [emblaApi]);
    useEffect(() => {
        if (!modalEmblaApi) return;
        const onSelect = () => setModalCurrentIndex(modalEmblaApi.selectedScrollSnap());
        modalEmblaApi.on("select", onSelect);
        onSelect();
    }, [modalEmblaApi]);
    const [modalOpen, setModalOpen] = useState(false);
    const scrollModalPrev = useCallback(() => modalEmblaApi && modalEmblaApi.scrollPrev(), [modalEmblaApi]);
    const scrollModalNext = useCallback(() => modalEmblaApi && modalEmblaApi.scrollNext(), [modalEmblaApi]);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (modalOpen) {
                if (event.key === "ArrowLeft") {
                    scrollModalPrev();
                } else if (event.key === "ArrowRight") {
                    scrollModalNext();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalOpen, scrollModalPrev, scrollModalNext]);

    return (
        <>
            <div className="flex ">
                <div className="text-[64px]  w-[35%] leading-[64px]  pl-16  flex flex-col justify-between ">
                    <div className="uppercase benzin-semi">

                        <p>об’єкти,</p>
                        <p className="text-right whitespace-nowrap ">що варто</p>
                        {/* <p></p> */}
                        <p className='text-right md:text-left'>побачити</p>
                    </div>
                    <div className="font-gotham text-right  md:text-left font-light pr-16 leading-10 text-[30px]">колекція нерухомості,<br /> яка вражає</div>
                </div>
                <div className="relative w-[60%]  h-full ">
                    {/* Навигационные стрелки (сверху) */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-16 flex space-x-[55px]">
                        <button onClick={scrollPrev} className="w-[110px] h-[110px] p-5 pr-6  rounded-full border border-white">
                            <Image src="/images/icons/Arrow1.svg" unoptimized alt="Arrow Icon" width={60} height={80} />
                        </button>
                        <button onClick={scrollNext} className="w-[110px] h-[110px] p-5 pl-6  rounded-full border border-white">
                            <Image src="/images/icons/Arrow2.svg" alt="Arrow Icon" unoptimized width={60} height={80} />
                        </button>
                    </div>

                    {/* Карусель */}
                    <div className="overflow-hidden rounded-lg ml-[10%] max-w-xl" ref={emblaRef}>
                        <div className="flex">
                            {slides.map((slide, index) => (
                                <div key={index} className="flex-none w-full  px-4 relative">

                                    <div className="absolute font-gotham text-[16px] px-4 py-1 top-3 left-6  bg-gradient-to-r from-[#DDBC96] uppercase to-[#926927] rounded-[48px]">{slide.offer}</div>
                                    <Image
                                        src={slide.images[0]}
                                        alt="House Image"
                                        width={350}
                                        onClick={() => openModal(slide)}
                                        height={220}
                                        unoptimized
                                        className="rounded-lg w-full object-cover max-h-[450px]"
                                    />
                                    {/* <button
                                        onClick={() => openModal(slide)}
                                        className="absolute font-gotham text-[16px] px-3 py-3 right-6 top-[395px] bg-gradient-to-r from-[#DDBC96]  to-[#926927] rounded-[48px]">
                                        <Image src={'/images/Search.svg'} className="" alt="feature" width={24} height={24} />
                                    </button> */}
                                    <div className="  h-full text-white mt-5 w-full">
                                        <div className="flex font-benzin-semi  justify-between space-x-10 ">
                                            <h2 className="text-[24px]">{slide.title}</h2>
                                            <p className="text-[26px] opacity-80 flex">{`${currentIndex + 1}`}/ <span className="text-[#8A8A8A]">{slides.length}</span></p>
                                        </div>
                                        <ul className=" space-y-1 font-gotham font-light text-[24px] mt-10 opacity-90">
                                            <li className="flex">
                                                <Image src={`/images/icons/Vector1.svg`} className="mr-4" alt="feature" width={20} height={20} />
                                                {slide.area}
                                            </li>
                                            <li className="flex">
                                                <Image src={`/images/icons/Vector2.svg`} className="mr-4" alt="feature" width={20} height={20} />
                                                {slide.rooms}
                                            </li>
                                            <li className="flex">
                                                <Image src={`/images/icons/Vector3.svg`} className="mr-4" alt="feature" width={20} height={20} />
                                                {slide.address}
                                            </li>
                                        </ul>
                                        <Link href={'#contact'} className="flex   justify-center mt-6 w-full py-2 text-center  text-[32px] font-medium text-gradient border-t ">
                                            ДІЗНАТИСЯ ПРО ОБ’ЄКТ
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && selectedSlide && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className=" p-6 rounded-lg max-w-lg w-full relative">
                        <button onClick={() => setModalOpen(false)} className="absolute top-8 right-10 z-[100] bg-gradient-to-r from-[#DDBC96]  to-[#926927] rounded-full flex  justify-center items-center leading-4 px-2 py-1 pb-2.5 text-white text-4xl">&times;</button>
                        <div className="overflow-hidden" ref={modalEmblaRef}>
                            <div className="flex">
                                {/* @ts-ignore */}
                                {selectedSlide.images.map((image, idx) => (
                                    <div key={idx} className="flex-none w-full">
                                        <Image
                                            src={image}
                                            alt="Slide Image"
                                            width={500}
                                            height={300}
                                            className="rounded-lg w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center mt-5 space-x-3">
                            {/* @ts-ignore */}
                            {selectedSlide.images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full border ${modalCurrentIndex === index ? "bg-white" : "border-white opacity-50"
                                        }`}
                                    onClick={() => modalEmblaApi && modalEmblaApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
