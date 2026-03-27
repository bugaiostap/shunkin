"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const WhyChooseUs = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const targetRef = useRef(null);
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Валидация формы
  const validateForm = () => {
    if (!age || !city || !phone || !telegram || !name) {
      return "Будь ласка, заповніть всі поля.";
    }

    // Проверка на возраст (например, от 18 до 100 лет)
    if (isNaN(age) || age < 18 || age > 100) {
      return "Вік повинен бути числом від 18 до 100.";
    }

    // Проверка телефона на соответствие формату (например, украинский формат)
    // const phonePattern = /^\+380\d{9}$/;
    // if (!phonePattern.test(phone)) {
    //   return "Телефон повинен бути у форматі +380XXXXXXXXX.";
    // }

    return null;
  };

  // Обработчик для отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    setIsSubmitting(true); // Включаем индикатор отправки
    setError(null); // Очищаем ошибку перед отправкой

    const formData = {
      name,
      age,
      city,
      phone,
      telegram,
    };

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true); // Если запрос успешен
        setError(null); // Очищаем ошибку
        // Очищаем поля после отправки
        setName("");
        setAge("");
        setCity("");
        setPhone("");
        setTelegram("");
      } else {
        throw new Error("Не удалось отправить данные.");
      }
    } catch (err) {
      console.log(err);

      setError("Сталася помилка при відправці форми.");
    } finally {
      setIsSubmitting(false); // Отключаем индикатор отправки
    }
  };

  useEffect(() => {
    // Проверяем, было ли уже показано окно
    const hasPopupBeenShown = localStorage.getItem("popupShown");
    const hasPopupBeenShownSession = sessionStorage.getItem("popupShown");
    if (hasPopupBeenShown || hasPopupBeenShownSession) {
      return; // Если окно уже показывалось, не показываем его снова
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPopupVisible(true); // Показываем popup
        }
      },
      {
        root: null, // Область просмотра — вся страница
        threshold: 0.5, // Порог видимости 50%
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  // Закрытие popup и сохранение в localStorage, чтобы не показывать его снова
  const closePopup = () => {
    setIsPopupVisible(false);
    localStorage.setItem("popupShown", "true");
    sessionStorage.setItem("popupShown", "true");
  };
  return (
    <div
      className="flex flex-col items-center p-4 bg-white mb-[130px]"
      id="WhyChooseUs"
    >
      {/* Заголовок */}
      <h2 className="text-4xl font-extrabold text-center font-gotham-bold tracking-tight">
        ЧОМУ{" "}
        <span className="text-red_main">
          ВАРТО
          <br />
        </span>{" "}
        ВИБРАТИ НАС?
      </h2>

      {/* Карточки */}
      <div className="mt-8 grid grid-cols-1  w-full max-w-sm md:grid-cols-2 lg:grid-cols-3 md:max-w-full">
        {/* Первая карточка */}
        <div className="flex flex-col items-center   p-4">
          <div className="mb-2 justify-center items-center rounded-full">
            {/* Иконка офиса */}
            <Image
              src="/images/icons/1.svg"
              alt="Build"
              className="w-12 h-12"
              width={100}
              height={100}
            />
          </div>
          <div className="rounded-3xl bg-pink_main grid grid-cols-1 gap-4 w-[358px] h-[112px] justify-center items-center py-[14px]">
            <h3 className="text-lg font-semibold text-center font-gotham leading-5">
              Затишний офіс <br />у центрі Києва
            </h3>
            <p className="text-base text-gray-600 text-center font-gotham leading-4">
              робота в комфортній <br />
              обстановці
            </p>
          </div>
        </div>

        {/* Вторая карточка */}
        <div className="flex flex-col items-center   p-4">
          <div className="mb-2 justify-center items-center rounded-full">
            {/* Иконка офиса */}
            <Image
              src="/images/icons/2.svg"
              alt="Clock"
              className="w-12 h-12"
              width={100}
              height={100}
            />
          </div>
          <div className="rounded-3xl bg-pink_main grid grid-cols-1 gap-4 w-[358px] h-[112px] justify-center items-center py-[14px]">
            <h3 className="text-lg font-semibold text-center font-gotham leading-5">
              Зручний графік
            </h3>
            <p className="text-base text-gray-600 text-center font-gotham leading-4">
              з 9:00 до 18:00
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center   p-4">
          <div className="mb-2 justify-center items-center rounded-full">
            {/* Иконка офиса */}
            <Image
              src="/images/icons/3.svg"
              alt="Money"
              className="w-12 h-12"
              width={1000}
              height={1000}
            />
          </div>
          <div className="rounded-3xl bg-pink_main grid grid-cols-1 gap-4 w-[358px] h-[112px] justify-center items-center py-[14px]">
            <h3 className="text-lg font-semibold text-center font-gotham leading-5">
              Стабільна заробітна плата
            </h3>
            <p className="text-base text-gray-600 text-center font-gotham leading-4">
              фіксована ставка{" "}
              <span className="font-extrabold text-black">
                30 000 грн <br />+ бонусна система
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center   p-4">
          <div className="mb-2 justify-center items-center rounded-full">
            {/* Иконка офиса */}
            <span className="text-4xl">📈</span>
            {/* <Image
              src="/images/icons/career.svg"
              alt="❌"
              className="w-12 h-12"
              width={100}
              height={100}
            /> */}
          </div>
          <div className="rounded-3xl bg-pink_main grid grid-cols-1 gap-4 w-[358px] h-[112px] justify-center items-center py-[14px]">
            <h3 className="text-lg font-semibold text-center font-gotham leading-5">
              Кар&apos;єрне зростання
            </h3>
            <p className="text-base text-gray-600 text-center font-gotham leading-4">
              від чат-менеджера <br />
              до керівника відділу
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center   p-4">
          <div className="mb-2 justify-center items-center rounded-full">
            {/* Иконка офиса */}

            <Image
              src="/images/icons/4.svg"
              alt="Grafic"
              className="w-12 h-12"
              width={100}
              height={100}
            />
          </div>
          <div className="rounded-3xl bg-pink_main grid grid-cols-1 gap-4 w-[358px] h-[112px] justify-center items-center py-[14px]">
            <h3 className="text-lg font-semibold text-center font-gotham leading-5">
              Дружній колектив
            </h3>
            <p className="text-base text-gray-600 text-center font-gotham leading-4">
              підтримка
              <br />
              на кожному етапі
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4">
          <div className="mb-2 justify-center items-center rounded-full">
            {/* Иконка офиса */}
            <Image
              src="/images/icons/5.svg"
              alt="Friendly"
              className="w-12 h-12"
              width={100}
              height={100}
            />
          </div>
          <div className="rounded-3xl bg-pink_main grid grid-cols-1 gap-4 w-[358px] h-[112px] justify-center items-center py-[14px]">
            <h3 className="text-lg font-semibold text-center font-gotham leading-5">
              Місця обмежені
            </h3>
            <p
              className="text-base text-gray-600 text-center font-gotham leading-4"
              ref={targetRef}
            >
              поспішай подати заявку,
              <br /> кількість вакансій обмежена!
            </p>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 flex-col w-full">
          <form
            className="space-y-4 bg-red_main pb-[70px] w-full relative text-center"
            id="Form"
            onSubmit={handleSubmit}
          >
            <div className="mb-6 ">
              <h2 className="text-3xl font-bold  text-center pt-6 text-white leading-7 font-gotham_bold tracking-tighter uppercase">
                місця обмежені!
              </h2>
              <p className="text-xl font-bold text-center  text-white leading-7 font-gotham tracking-tighter">
                Хочеш заробляти вже зараз?
                <br />
                Не зволікай! 
              </p>
            </div>
            <button
              className="text-black font-thin flex  flex-col gap-2 w-8 h-8 absolute right-0 top-0"
              onClick={closePopup}
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
            {error && (
              <p className="text-purple_maintext-xl font-bold text-center  leading-7 font-gotham tracking-tighter">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-xl font-bold text-center leading-7 font-gotham tracking-tighter">
                Форма відправлена успішно!
              </p>
            )}
            <div className="px-14">
              <input
                type="text"
                placeholder="ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full  pt-6 text-black bg-red_main focus:outline-none  border-b-2"
              />
              <input
                type="text"
                placeholder="Вік"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full  pt-6 text-black bg-red_main focus:outline-none  border-b-2"
              />
              <input
                type="text"
                placeholder="Місто"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full  pt-6 text-black bg-red_main focus:outline-none border-b-2"
              />
              <input
                type="tel"
                placeholder="+380"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full  pt-6 text-black  bg-red_main focus:outline-none border-b-2"
              />
              <input
                type="text"
                placeholder="Телеграм"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full pt-6  text-black bg-red_main focus:outline-none  border-b-2"
              />
            </div>

            <button
              type="submit"
              className="w-[256px] h-[46px] bg-white text-xl font-gotham font-medium   text-purple_main  rounded-lg hover:bg-gray-800 transition"
              disabled={isSubmitting} // Отключаем кнопку при отправке
            >
              {isSubmitting ? "Залишити заявку..." : "Залишити заявку"}
            </button>
            <div className="flex justify-center absolute left-[calc(50%-135px)] bottom-[-184px]">
              <div className="relative">
                <Image
                  src="/images/image 25.png" // путь к изображению с лицом
                  alt="Face"
                  className="object-cover max-w-[270px] h-[240px]"
                  width={270}
                  height={240}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;
