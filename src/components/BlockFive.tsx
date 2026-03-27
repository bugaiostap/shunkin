"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import TestimonialCarousel from './TestimonialCarousel'
import Link from 'next/link'
import TestimonialCarouselDesktop from './TestimonialsDesctop'
const BlockFive = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Открытие/закрытие попапа
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setError("");
        setName("");
        setPhone("");
        setMessage("");
    };

    // Отправка отзыва
    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !message) {
            setError("Всі поля обов'язкові");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/reviews", {
            method: "POST",
            body: JSON.stringify({ name, phone: ' ', message }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toggleModal();
        } else {
            setError("Помилка при додаванні відгуку");
        }

        setLoading(false);
    };
    return (
        <>
            <div id='testimonials' className="block md:hidden">

                <div className='flex w-full flex-col items-center justify-center mt-[100px] mb-10'>
                    <Image src="/images/logo.png" alt="logo" width={80} height={76} />
                    <p className='font-benzin-semi font-medium text-[8px]'>shunkin.com.ua</p>
                </div>
                <div className="text-[30px] px-4 leading-8 font-bold uppercase mb-16 max-w-2xl mx-auto">
                    <p className=''>Коли житло</p>
                    <p className='text-right md:text-left'> — це любов</p>
                    <p className='text-center md:text-left'>з першого</p>
                    <p className='text-right md:text-left'>погляду</p>
                </div>
                <TestimonialCarousel />
                <button onClick={toggleModal} className="flex  uppercase  justify-center mt-20 w-full py-2 text-center  text-xl font-medium text-gradient ">
                    [ залишити відгук ]
                </button >
            </div>
            <div id='testimonials' className="hidden md:block">

                {/* <div className='flex w-full flex-col items-center justify-center mt-[100px] mb-10'>
                    <Image src="/images/logo.png" alt="logo" width={80} height={76} />
                    <p className='font-benzin-semi font-medium text-[8px]'>shunkin.com.ua</p>
                </div> */}
                <div className="text-[80px] px-4 leading-[80px] font-bold uppercase mb-16 max-w-6xl mx-[320px] mt-[145px] ">
                    <p className=''>Коли житло</p>
                    <p className='text-right'> — це любов</p>
                    <p className='text-center '>з першого</p>
                    <p className='text-right'>погляду</p>
                </div>
                <TestimonialCarouselDesktop />
                <div className="w-1/2 flex justify-end items-end">

                    <button onClick={toggleModal} className="flex  uppercase  justify-center mt-20 py-2 text-center  text-[40px] font-medium text-gradient ">
                        [ залишити відгук ]
                    </button>

                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-[#151515] p-6 md:p-10 rounded-lg w-96 md:w-[530px] relative">
                        <button onClick={toggleModal} className="absolute top-2 right-4 text-3xl md:text-5xl text-white">
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-white text-center md:text-3xl">Залишити відгук</h2>
                        <form onSubmit={submitReview} className="space-y-3 font-gotham">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ім'я"
                                className="w-full  pt-6 text-white bg-[#151515] focus:outline-none  border-b-2"
                            />
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ваш відгук"
                                className="w-full  pt-6 text-white bg-[#151515] focus:outline-none  border-b-2"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <button className="w-full h-[46px] md:text-left md:px-10  text-2xl md:text-[40px] font-medium text-gradient   font-benzin-semi uppercase rounded-lg !mt-10 md:!mt-[80px]" disabled={loading}>
                                {loading ? "Надсилання..." : "[ Надіслати ]"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default BlockFive