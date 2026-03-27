"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between border-b-2  px-4 py-2 relative z-50 h-[892px]">
      {/* <div className="text-black font-medium tracking-wide text-xl font-motel">
        <Image src="/images/logo.png" width={64} height={50} alt="logo" />
      </div> */}
      <div className="h-[600px] w-full top-0 left-0 bg-[#C4D5DD] absolute"></div>
      <div className="absolute  h-[350px] left-0 w-full top-0  z-[31] bg-gradient-to-t  from-[#141414]/[0.72] to-black/0 rotate-180"></div>
      {/* <div className="w-full h-[700px] top-[700px] absolute left-0 bg-[#1B1B1B] z-[29]"></div> */}
      {/* <div className="absolute left-0 w-full  top-0 h-[350px] bg-gradient-to-t from-[#141414]/[0.72] to-black/0 rotate-180"></div> */}

      <Image
        className="absolute left-0 top-[278px] z-[30]"
        src="/images/hero.png"
        quality={100}
        unoptimized
        priority
        style={{
          width: "100%",
          height: "auto",
        }}
        width={100}
        height={481}
        alt="logo"
      />
      <div className="absolute left-0 w-full bottom-[0px]  z-[32] h-[392px] bg-gradient-to-t from-[#141414] to-[#141414]/0 "></div>
      <div className="absolute left-0 w-full bottom-[0px]  z-[32] h-[290px] bg-gradient-to-t from-[#141414] to-[#141414]/0 "></div>
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
      {isMenuOpen && (
        <div className="absolute top-10 right-0  w-full bg-purple_main p-4 flex flex-col items-center rounded-b-2xl">
          <ul className="text-white mt-[60px] mb-[32px] font-gotham text-center space-y-3">
            <li>
              <Link href={"#home"} className="hover:underline">
                Заробітна плата
              </Link>
            </li>
            <li>
              <Link href={"#Steps"} className="hover:underline">
                Як почати работу?
              </Link>
            </li>
            <li>
              <Link href={"#Responsibilities"} className="hover:underline">
                Обов’язки
              </Link>
            </li>
            <li>
              <Link href={"#WhyChooseUs"} className="hover:underline">
                Чому ми?
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
    </header>
  );
};

export default Header;
