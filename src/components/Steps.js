import React from "react";

const Steps = () => {
  return (
    <div className="flex flex-col items-center py-8 bg-white mb-[130px]" id="Steps">
      {/* Заголовок */}
      <h2 className="text-3xl font-bold text-center font-gotham_bold tracking-tight">
        УСЬОГО <span className="text-purple_main">3 КРОКИ <br/></span> ДО ПОЧАТКУ <br/>РОБОТИ!
      </h2>

      {/* Шаги */}
      <div className="mt-8 space-y-8 md:flex md:space-y-0 md:gap-24">
        {/* Шаг 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-red_main text-white  font-bold rounded-lg text-2xl">
            1
          </div>
          <h3 className="mt-4 text-lg font-semibold">ЗАПОВНИ</h3>
          <p className="text-gray-600 text-lg mt-[-10px]">анкету прямо на сайті</p>
        </div>

        {/* Шаг 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-red_main text-white text-2xl font-bold rounded-lg">
            2
          </div>
          <h3 className="mt-4 text-lg font-semibold">ПРОЙДИ</h3>
          <p className="text-gray-600 text-lg mt-[-10px]">співбесіду онлайн</p>
        </div>

        {/* Шаг 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-red_main text-white text-2xl font-bold rounded-lg">
            3
          </div>
          <h3 className="mt-4 text-lg font-semibold">ПОЧНИ</h3>
          <p className="text-gray-600 text-lg leading-4 mt-[-5px]">
            працювати та заробляти <br/>вже наступного тижня!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
