"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

// const slides = [
//     {
//         images: ["/images/image_73.png", "/images/image_74.png", "/images/image_75.png", "/images/image_76.png", "/images/image_77.png", "/images/image_78.png", "/images/image_79.png", "/images/image_80.png", "/images/image_81.png", "/images/image_82.png"], // Замените на свои изображения
//         title: "квартира у ЖК «Новодворянський»",
//         features: ["площа 70,5 м2", "2 кімнати,  1 санвузол", "Вул. Володимира Вернадського 29, 29K"],
//     },
//     {
//         images: ["/images/image_90.png", "/images/image_91.png", "/images/image_92.png", "/images/image_93.png", "/images/image_94.png", "/images/image_95.png", "/images/image_96.png", "/images/image_97.png",],
//         title: "квартира у ЖК «парковий»",
//         features: ["площа 70 м2", "2 кімнати, 2 санвузли", "Вул. Староказацька 54"],
//     },
//     {
//         images: ["/images/Mask group-4sd.png", "/images/Mask group-6dds.png", "/images/sadasfasf.png", "/images/Mask group-12122fdf.png", "/images/Mask group-2ы.png", "/images/Mask group-3sd.png", "/images/Mask group-4sd.png"],
//         title: "4х поверхова будівля (2012)",
//         features: ["площа 1 600 м2", "4 поврхи, 4 санвузліи", "Провулок Універсальний 6"],
//     },
//     {
//         images: ["/images/Mask group.png", "/images/Mask group-8.png", "/images/Mask group-10.png", "/images/Mask group-5.png", "/images/Mask group-3.png", "/images/Mask group-4.png", "/images/Mask group-2.png", "/images/Mask group-6.png", "/images/Mask group-1.png", "/images/Mask group-7.png"],
//         title: "2-поверховий затишний будинок",
//         features: ["площа 265 м2", "2 поврхи, 4 санвузліи", "Вул. Передова 12"],
//     },
// ];
interface Slide {
    id: number;
    title: string;
    area: string;
    rooms: string;
    offer: string;
    address: string;
    images: string[];
}
export default function Carousel() {
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
    return (
        <>
            <div className="relative w-full max-w-md h-full mx-auto mt-[60px] pt-[92px]">
                {/* Навигационные стрелки (сверху) */}
                <div className="absolute top-[0px] right-4 flex space-x-[38px]">
                    <button onClick={scrollPrev} className="w-[42px] h-[42px] p-2  rounded-full border border-white">
                        <Image src="/images/icons/Arrow1.svg" unoptimized alt="Arrow Icon" width={32} height={32} />
                    </button>
                    <button onClick={scrollNext} className="w-[42px] h-[42px] p-2  rounded-full border border-white">
                        <Image src="/images/icons/Arrow2.svg" alt="Arrow Icon" unoptimized width={32} height={32} />
                    </button>
                </div>

                {/* Карусель */}
                <div className="overflow-hidden rounded-lg max-w-7xl" ref={emblaRef}>
                    <div className="flex">
                        {slides.length > 0 && slides.map((slide, index) => (
                            <div key={index} className="flex-none w-full relative px-4 ">
                                <div className="absolute font-gotham text-[16px] px-4 py-1 top-3 left-6  bg-gradient-to-r from-[#DDBC96] uppercase to-[#926927] rounded-[48px]">{slide.offer}</div>
                                <Image
                                    onClick={() => openModal(slide)}
                                    src={slide.images[0]}
                                    alt="House Image"
                                    width={350}
                                    height={220}
                                    unoptimized
                                    className="rounded-lg w-full object-cover max-h-[300px]"
                                />
                                {/* <button onClick={() => openModal(slide)} className="absolute font-gotham text-[16px] px-2 py-2 right-6 top-[260px] bg-gradient-to-r from-[#DDBC96]  to-[#926927] rounded-[48px]">
                                    <Image src={'/images/Search.svg'} className="" alt="feature" width={18} height={18} />
                                </button> */}
                                <div className="  h-full text-white mt-5 w-full">
                                    <div className="flex font-benzin-semi  justify-between space-x-10 ">
                                        <h2 className="text-md">{slide.title}</h2>
                                        <p className="text-sm opacity-80 flex">{`${currentIndex + 1}`}/ <span className="text-[#8A8A8A]">{slides.length}</span></p>
                                    </div>
                                    <ul className=" space-y-1 font-gotham font-light text-[16px] mt-10 opacity-90">
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
                                    <Link href={'#contact'} className="flex   justify-center mt-6 w-full py-2 text-center  text-[22px] font-medium text-gradient border-t ">
                                        ДІЗНАТИСЯ ПРО ОБ’ЄКТ
                                    </Link>
                                </div>
                            </div>
                        ))}
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
                                    className={`w-3 h-3 rounded-full border ${modalCurrentIndex === index ? "bg-white" : "border-white  opacity-50"
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
