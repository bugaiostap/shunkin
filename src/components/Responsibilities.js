import React from "react";
import Image from "next/image";

const Responsibilities = () => {
  return (
    <div
      className="flex flex-col items-center py-8 bg-white relative mb-[130px] "
      id="Responsibilities"
    >
      {/* Заголовок */}
      <h2 className="text-3xl font-bold text-center leading-7 font-gotham_bold tracking-tight">
        ЧИМ ТИ{" "}
        <span className="text-purple_main">
          <br />
          ЗАЙМАТИМЕШСЯ?
        </span>
      </h2>

      {/* Список */}
      <div className="mt-6 w-full max-w-md   p-4 bg-white flex items-center flex-col md:flex-row md:max-w-full">
        <ul className="space-y-4 text-gray-700 flex flex-col md:flex-row md:w-full md:items-center md:justify-center md:gap-10 md:space-y-0">
          <li className="flex items-center md:m-0">
            <span className="text-red_main text-3xl font-bold mr-2 ">✔</span>
            <span className="font-gotham text-lg tracking-tight leading-4">
              <span className="font-bold">Спілкування з клієнтами</span> через
              <br /> месенджери та платформи чат
            </span>
          </li>
          <li className="flex items-center md:m-0">
            <span className="text-red_main text-3xl font-bold mr-2">✔</span>
            <span className="font-gotham text-lg tracking-tight leading-4">
              <span className="font-bold">Оперативне вирішення</span>
              <br /> питань та консультування
            </span>
          </li>
          <li className="flex items-center md:m-0">
            <span className="text-red_main text-3xl font-bold mr-2 ">✔</span>
            <span className="font-gotham text-lg tracking-tight leading-4">
              <span className="font-bold">Підтримка </span>найвищого <br />
              рівня сервісу
            </span>
          </li>
          <li className="flex items-center md:m-0 md:justify-start">
            <span className="text-red_main text-3xl font-bold mr-2">✔</span>
            <span className="font-gotham text-lg font-bold tracking-tight">
              Робота із готовими сценаріями
            </span>
          </li>
        </ul>
      </div>

      {/* Изображение и текст */}
      <div className="mt-8 flex flex-col items-center  bg-purple_main p-4 rounded-3xl w-[358px] h-[205px] relative">
        <div className=" mb-4 absolute left-6 bottom-[-80px]">
          <Image
            src="/images/2345455555 1.png"
            alt="Megaphone"
            className="w-[270px] h-[320px]"
            width={270} height={320}
          />
        </div>
        <p className="text-[#FFD555] font-bold  font-gotham-bold text-lg absolute bottom-8 right-7 leading-5">
          ОПЫТ РАБОТЫ <br />
          НЕ ОБЯЗАТЕЛЕН — <br />
          <span className="text-white font-gotham">
            ПРЕДОСТАВЛЯЕМ<br />
            ОБУЧЕНИЕ!
          </span>
        </p>
      </div>
    </div>
  );
};

export default Responsibilities;
