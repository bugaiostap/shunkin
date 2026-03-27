import Image from "next/image";

export default function BlockTwo() {
    return (
        <div id="how-it-work" className=" flex flex-col md:flex-row mx-auto ">
            <div className="mt-[100px] px-[14px] text-[30px]  flex flex-col md:hidden ">
                <h2 className="text-left  font-bold text-gradient align-text-top leading-8.5">
                    КІЛЬКА КРОКІВ
                </h2>
                <h3 className="text-left mt-0.5 pl-[78px] align-text-top  font-semibold leading-8 text-[#060606]">
                    ВІД МРІЇ
                </h3>
                <p className="text-right leading-8.5 align-text-top"> ДО КЛЮЧІВ </p>
                <div className="flex flex-row  mt-10 justify-between space-x-[38px]">
                    <div className="text-[20px] font-benzin-semi whitespace-nowrap">1 &nbsp; /</div>
                    <div className="text-[16px] font-gotham w-full text-left">Вибирай для себе найкращій варіант.</div>
                </div>
                <div className="flex flex-row  mt-10 justify-between space-x-[38px]">
                    <div className="text-[20px] font-benzin-semi whitespace-nowrap  tracking-wide ">2 /</div>
                    <div className="text-[16px] font-gotham w-max">Або залишайте заявку і ми дамо відповіді на всі ваші питання.</div>
                </div>
                <div className="flex flex-row  mt-10 justify-between space-x-[38px]">
                    <div className="text-[20px] font-benzin-semi tracking-wide whitespace-nowrap">3 /</div>
                    <div className="text-[16px] font-gotham w-max">Отримуйте повний супровід. Економте свій час та безпечно закривайте усі операції з нерухомості.</div>
                </div>
            </div>
            <Image width={124} height={100} className="w-full mt-10 block md:hidden" unoptimized alt="asfas" src={"/images/seconde.png"} />
            <div className="mt-[210px] px-[63px]   hidden   md:flex  space-x-[225px]">
                <div className="w-1/2 text-[64px] ">
                    <h2 className="text-left  font-bold text-gradient align-text-top leading-8.5">
                        КІЛЬКА КРОКІВ
                    </h2>
                    <h3 className="text-left mt-0.5 pl-[78px] align-text-top  font-semibold leading-8 text-[#060606]">
                        ВІД МРІЇ
                    </h3>
                    <p className="text-right leading-8.5 align-text-top "> ДО КЛЮЧІВ </p>
                    <Image width={124} height={100} className="w-full mt-10" unoptimized alt="asfas" src={"/images/seconde.png"} />
                </div>
                <div className="w-1/2 flex flex-col space-y-[123px] my-auto">
                    <div className="flex flex-row  mt-10 justify-between space-x-[38px]">
                        <div className="text-[50px] font-benzin-semi whitespace-nowrap">1 &nbsp; /</div>
                        <div className="text-[30px] font-gotham w-full ">Вибирай для себе <br /> найкращій варіант.</div>
                    </div>
                    <div className="flex flex-row  mt-10  space-x-[38px]">
                        <div className="text-[50px] font-benzin-semi whitespace-nowrap  tracking-wide ">2 /</div>
                        <div className="text-[30px] font-gotham w-max">Або залишайте заявку і ми дамо  <br /> відповіді на всі ваші питання.</div>
                    </div>
                    <div className="flex flex-row  mt-10 justify-between space-x-[38px]">
                        <div className="text-[50px] font-benzin-semi tracking-wide whitespace-nowrap">3 /</div>
                        <div className="text-[30px] font-gotham">Отримуйте повний супровід. Економте свій час та безпечно закривайте усі операції з нерухомості.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}