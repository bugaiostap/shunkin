import Link from "next/link";
import Image from "next/image";
// components/Footer.js
export default function FooterDesctop() {
    return (
        <div className="w-full hidden md:block">
            <Link
                href={"#"}
                className="mt-28 text-[28px] font-gotham font-medium flex w-full items-center justify-center"
            >
                На головну{" "}
                <Image
                    className="ml-4"
                    src="/images/icons/arrowtop.svg"
                    alt="arrowtop"
                    width={18}
                    height={10}
                />
            </Link>
            <div className="md:flex w-full font-benzin uppercase justify-center md:mt-[100px]  text-[154px] mb-[120px]">
                <p className="  leading-[56px] mt-12 md:mt-0 ">
                    shunkin.
                </p>
                <p className="text-right uppercase   leading-[56px] mr-2">
                    com.ua
                </p>
            </div>
            <footer className="bg-white text-center mt-[60px] py-16 border-t border-black  scroll-smooth md:flex max-w-full justify-evenly mx-auto ">

                <div className="mt-24 md:mt-0 space-y-2 text-[#00000080] text-left text-[22px] font-gotham">

                    <h2 className="text-lg font-bold font-gotham text-black !mb-10">КОНТАКТИ</h2>
                    <a href="tel:+380983150111" className="text-gray-800 ">
                        +38 (098) 315-01-11
                    </a>
                    <p className="text-gray-800 mt-1">info@shunkin.shop.com.ua</p>
                    <p className="text-gray-800 mt-1">м. Дніпро, вул. Центральна, 12</p>

                </div>
                <div className="mt-24 md:mt-0 space-y-2 text-left text-[#00000080] text-[22px] font-gotham ">
                    <div className="">
                        <h3 className=" text-black font-bold uppercase">Графік роботи:</h3>
                        <ul className="list-disc list-inside text-gray-800 mt-1">
                            <li>Пн-Пт: 09:00 - 18:00</li>
                            <li>Сб-Нд: вихідні</li>
                        </ul>
                    </div>
                </div>
                <div className=" md:mt-0 space-y-2 text-black text-left text-[16px] font-gotham">
                    <p className="">
                        <Link
                            href={"#how-it-work"}
                            className="hover:underline font-medium text-[22px]"
                        >
                            Як це працює
                        </Link>
                    </p>
                    <p>
                        <Link
                            href={"#objects"}
                            className="hover:underline font-medium text-[22px]"
                        >
                            Обʼєкти
                        </Link>
                    </p>
                    <p>
                        <Link
                            href={"#testimonials"}
                            className="hover:underline font-medium text-[22px]"
                        >
                            Відгуки
                        </Link>
                    </p>
                </div>
                <div className="mt-24 md:mt-0 space-y-2 text-[#000000] text-[28px] font-bold font-gotham ">
                    <p>
                        <a
                            href={"https://www.instagram.com/shunkin.com.ua/"}
                            className="underline uppercase"
                        >
                            INSTAGRAM
                        </a>
                    </p>
                    <p>
                        <a
                            href={"https://www.facebook.com/profile.php?id=100066421496758"}
                            className=" mt-5 underline uppercase"
                        >
                            FACEBOOK
                        </a>
                    </p>
                </div>
            </footer>
            <div className="mt-12 text-[#00000080]   text-lg font-gotham mb-6 text-center">
                © 2025 "Shunkin.shop". Усі права захищено.
            </div>
        </div>
    );
}
