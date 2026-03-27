"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function RealEstateBlock() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="relative w-full min-h-screen md:hidden text-[#FFFFFF] ">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-4 text-white text-lg font-bold border-b">
        <Image src="/images/logo.png" alt="Logo" width={64} height={50} />
        <button
          className="relative w-8 h-8 flex flex-col gap-2 z-[33] justify-center items-center font-normal"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span
            className={`block w-6 h-[1px] bg-white transform transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[1px] bg-white transform transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </header>
      {isMenuOpen && (
        <div className="absolute top-20 right-0  w-full bg-gray-500 p-4 flex flex-col items-center rounded-b-2xl z-[1000]">
          <ul className="text-white mt-[60px] mb-[32px] font-gotham text-center space-y-3">
            <li>
              <Link href={"#how-it-work"} className="hover:underline">
                Як це працює
              </Link>
            </li>
            <li>
              <Link href={"#objects"} className="hover:underline">
                Обʼєкти
              </Link>
            </li>
            <li>
              <Link href={"#testimonials"} className="hover:underline">
                Відгуки
              </Link>
            </li>
          </ul>
          <button
            className=" text-black font-thin flex  flex-col gap-2 w-8 h-8"
            onClick={toggleMenu}
            aria-label="Закрыть меню"
          >
            <span
              className={
                "block w-6 h-[1px] bg-white transform transition-transform duration-300  rotate-45 translate-y-1.5"
              }
            ></span>
            <span
              className={
                "block w-6 h-[1px] bg-white transform transition-transform duration-300  -rotate-45 -translate-y-1.5"
              }
            ></span>
          </button>
        </div>
      )}
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/image.png"
          alt="Building"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/75 via-[#141414]/5 to-[#141414]/95"></div>
      </div>

      {/* Content */}
      <div className="relative text-center  px-4 z-10 pt-[128px]">
        <div className="pb-[225px]">
          <div className="flex justify-between uppercase text-[10px] font-gotham mb-[20px]">
            <p>вибирайте /</p>
            <p>порівнюйте /</p>
            <p>купуйте легко /</p>
          </div>
          <div className="flex items-end font-semibold flex-col text-left">
            <h1 className="text-6xl font-normal uppercase">SHUNKIN.</h1>
            <h1 className="text-6xl font-normal uppercase">COM.UA</h1>
          </div>
        </div>
        <div className="flex items-start flex-col mb-[76px]">
          <h2 className="text-3xl font-semibold mt-2 uppercase text-start">
            МАГАЗИН НЕРУХОМОСТІ
          </h2>
          <p className="text-sm mt-2 leading-relaxed text-start font-gotham text-[#FFFFFFD1] w-[220px]">
            Готова нерухомість в каталозі з реальними цінами та перевіреними
            документами.
          </p>
        </div>
        <a
          href="#Form"
          className="flex uppercase justify-center mt-20 w-full py-2 text-center text-xl font-medium text-gradient"
        >
          [Залишити заявку]
        </a>
      </div>
    </section>
  );
}
