import Image from "next/image";
import Link from "next/link";

export default function RealEstateBlockDesktop() {
    return (
        <section className="relative w-full hidden md:block max-h-[1300px] bg-gray-700 text-[#FFFFFF] ">
            {/* Header */}

            <Image
                src="/images/heroDesctop.png"
                alt="Building"
                layout="fill"
                // objectFit="cover"
                className=""
                // width={600}
                // height={500}
                quality={100}
            />
            <div className=" max-w-[1156px] absolute inset-0 bg-gradient-to-r from-[#141414]  to-[#141414]/0">
            </div>
            {/* <div className="">Готова нерухомість укаталозі з реальними цінами та перевіреними документами</div> */}
            <header className="absolute top-10 left-8  flex items-center text-[20px] p-4 text-white uppercase">
                <Image src="/images/logo.png" alt="Logo" width={129} height={100} />
                <div className="">shunkin.com.ua</div>
                <div className="flex font-gotham ml-[400px] space-x-10">
                    <p className=" ">
                        <Link
                            href={"#how-it-work"}
                            className="hover:underline font-medium text-[20px]"
                        >
                            Як це працює
                        </Link>
                    </p>
                    <p>
                        <Link
                            href={"#objects"}
                            className="hover:underline font-medium text-[20px]"
                        >
                            Обʼєкти
                        </Link>
                    </p>
                    <p>
                        <Link
                            href={"#testimonials"}
                            className="hover:underline font-medium text-[20px]"
                        >
                            Відгуки
                        </Link>
                    </p>
                </div>
            </header>
            <div className="flex">
                <div className="relative text-center px-16 w-full z-10 mt-[420px]">
                    <div className="flex items-start flex-col ">
                        <div className="flex justify-between uppercase text-[22px] font-gotham mb-[20px] space-x-[67px]">
                            <p>вибирайте /</p>
                            <p>порівнюйте /</p>
                            <p>купуйте легко /</p>
                        </div>
                        <h2 className="text-[100px] leading-[110px] font-semibold mt-2 uppercase text-start">
                            МАГАЗИН <br /> НЕРУХОМОСТІ
                        </h2>

                    </div>
                    <div className="w-full flex justify-between mt-48 mb-[112px]">

                        <p className="  leading-[40px] text-[28px] text-start font-gotham text-[#FFFFFFD1] w-1/2">
                            Готова нерухомість укаталозі <br /> з реальними цінами та <br /> перевіреними документами
                        </p>
                        <a
                            href="#Form"
                            className="flex uppercase justify-end  w-full py-2 text-center text-[40px] font-medium  text-gradient"
                        >
                            [ залишити заявку ]
                        </a>
                    </div>
                </div>

            </div>

            {/* <div className=" inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/75 via-[#141414]/5 to-[#141414]/95"></div>
                </div> */}
        </section>
    );
}
