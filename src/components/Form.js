"use client";
import { useState } from "react";
import Image from "next/image";

export default function Form() {
  // Состояния для каждого поля формы
  // const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  // const [telegram, setTelegram] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Валидация формы
  const validateForm = () => {
    if (!city || !phone || !name) {
      return "Будь ласка, заповніть всі поля.";
    }

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
      city,
      phone,
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
        setName("");
        setCity("");
        setPhone("");
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

  return (
    <>
      <div className="flex flex-col w-full  md:flex-row-reverse mx-auto md:mt-[240px]">
        <div className="mt-[240px] md:mt-0 relative w-full md:w-1/2">
          <div className="uppercase block md:hidden w-full px-4 leading-8 text-[30px]">
            <p>Ваша мрія</p>
            <p className="text-right md:text-left">ближче, ніж</p>
            <p className="text-right md:text-left"> здається</p>
          </div>
          <div className="absolute md:hidden  h-[90px] left-0 w-full bottom-[-1px]  z-[31] bg-gradient-to-t  from-[#151515] to-[#151515]/0 "></div>
          <Image
            src={"/images/formImage.png"}
            unoptimized
            width={390}
            height={310}
            alt="form-image "
            className="w-full h-full "
          />
        </div>
        <div className="relative md:w-1/2 " id="contact">
          <form
            className="space-y-4 bg-[#151515] pb-[70px] w-full h-full flex flex-col justify-center text-center font-gotham"
            id="Form"
            onSubmit={handleSubmit}
          >
            <div className="uppercase text-white w-full hidden md:block !mb-[140px] mt-24 font-benzin pr-[140px] px-14 leading-[72px] text-[64px]">
              <p className="text-left">Ваша мрія</p>
              <p className="text-right ">ближче, ніж</p>
              <p className="text-right "> здається</p>
            </div>
            {error && (
              <p className="text-white text-xl font-light text-center  leading-7 font-gotham tracking-tighter">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-xl font-light text-center   leading-7 font-gotham tracking-tighter">
                Форма відправлена успішно!
              </p>
            )}
            <div className="px-10 max-w-[660px] md:text-[24px] md:mb-[160px]">
              <input
                type="text"
                placeholder="Ваше ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full  pt-6 text-white bg-[#151515] focus:outline-none  border-b-2"
              />
              <input
                type="text"
                placeholder="Запит (купити продати)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full  pt-6 text-white bg-[#151515] focus:outline-none border-b-2"
              />
              <input
                type="tel"
                placeholder="+380"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full  pt-6 text-white  bg-[#151515] focus:outline-none border-b-2"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[46px] md:text-left md:px-10  text-xl md:text-[40px] font-medium text-gradient   font-benzin-semi uppercase rounded-lg !mt-10 md:!mt-[160px] "
              disabled={isSubmitting} // Отключаем кнопку при отправке
            >
              {isSubmitting
                ? "[ Знайти мій варіант ... ]"
                : "[ Знайти мій варіант ]"}
            </button>
          </form>
          <div className="flex justify-center absolute left-[calc(50%-135px)] bottom-[-76px]"></div>
        </div>
      </div>
    </>
  );
}
