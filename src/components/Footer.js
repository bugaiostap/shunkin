import Link from "next/link";
import Image from "next/image";
// components/Footer.js
export default function Footer() {
  return (
    <div className="block md:hidden">
      <Link
        href={"#"}
        className="mt-28 font-gotham font-medium flex w-full items-center justify-center"
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
      <div className="md:flex w-full justify-center md:mt-[100px]">
        <p className="uppercase text-[56px] leading-[45px] md:leading-[56px] mt-12 md:mt-0 ">
          shunkin.
        </p>
        <p className="text-right uppercase text-[56px]  leading-[56px] mr-2">
          com.ua
        </p>
      </div>
      <footer className="bg-white text-center mt-[60px] py-16 border-t border-black  scroll-smooth md:flex max-w-7xl justify-evenly mx-auto ">
        <div className="space-y-3 text-black font-bold font-gotham text-lg">
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
          <p className="!mt-12 ">
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
        <div className="mt-24 md:mt-0 space-y-2 text-[#00000080] text-[16px] font-gotham">
          {/* <p>Privacy Policy</p>
          <p>Cookie Policy</p> */}
          <h2 className="text-lg font-bold text-black">КОНТАКТИ</h2>
          <a href="tel:+380983150111" className="text-gray-800 mt-2">
            +38 (098) 315-01-11
          </a>
          <p className="text-gray-800 mt-1">info@shunkin.shop.com.ua</p>
          <p className="text-gray-800 mt-1">м. Дніпро, вул. Центральна, 12</p>

          <div className="!mt-12">
            <h3 className=" text-black">Графік роботи:</h3>
            <ul className="list-disc list-inside text-gray-800 mt-1">
              <li>Пн-Пт: 09:00 - 18:00</li>
              <li>Сб-Нд: вихідні</li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="mt-12 text-[#00000080]   text-lg font-gotham mb-6 text-center">
        © 2025 "Shunkin.shop".
        <br /> Усі права захищено.
      </div>
    </div>
  );
}
