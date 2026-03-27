import Image from "next/image";

export default function BlockThree() {
    return (
        <>
            <div className="mt-[100px] px-[14px]   flex flex-col mb-[100px] md:hidden">
                <h2 className="text-left text-[30px] uppercase align-text-top leading-8">
                    Ваш спокій — наш пріоритет
                </h2>
                <p className="font-gotham mt-2.5 text-[18px]" >Основні переваги:</p>
                <div className="flex space-x-5 mt-10">
                    <Image width={171} height={194} className="w-1/2 h-48  " unoptimized alt="asfas" src={"/images/image1.png"} />
                    <div className="flex flex-col justify-between ">
                        <p className="text-right" >01</p>
                        <p className="text-[16px] font-gotham " >Тільки найкращі пропозиції ринку нерухомості — прозорі угоди.</p>
                    </div>
                </div>
                <div className="flex space-x-5 mt-10">
                    <div className="flex flex-col  w-1/2">
                        <p className="text-right" >02</p>
                    </div>
                    <div className="w-1/2">
                        <Image width={174} height={114} className=" h-32 w-full " unoptimized alt="asfas" src={"/images/image2.png"} />
                        <p className="text-[16px] font-gotham mt-4" >Найвигідніші та перспективні обʼєкти з прозорою економікою.</p>
                    </div>
                </div>
                <div className="flex space-x-5 mt-10">
                    <div className="flex flex-col justify-between ">
                        <p className="" >03</p>
                        <p className="text-[16px] font-gotham " >Найвищій рівень юридичної підтримки в усіх угодах. Гарантії комерційної таємниці.</p>
                    </div>
                    <Image width={171} height={234} className="w-1/2 h-48 my-2.5 " unoptimized alt="asfas" src={"/images/image3.png"} />
                </div>
            </div>
            <div className="mt-[220px] px-[63px]   hidden flex-col mb-[100px] md:flex  mx-auto">
                <div className="w-max">
                    <h2 className="text-left text-[64px] uppercase align-text-top leading-[72px] ">
                        Ваш спокій — <br /> наш пріоритет
                    </h2>
                    <p className="font-gotham mt-2.5 text-[30px] text-right" >Основні переваги:</p>
                </div>
                <div className="flex space-x-8 mt-16">

                    <div className=" space-x-5 mt-10 w-1/3">
                        <Image width={581} height={334} className="max-h-[330px] w-full " unoptimized alt="asfas" src={"/images/mask1.png"} />
                        <div className="flex justify-between mt-10 ">
                            <p className="text-[24px] font-gotham  " >Тільки найкращі пропозиції ринку нерухомості — прозорі угоди.</p>
                            <p className="text-right text-[50px] leading-[110px]" >01</p>
                        </div>
                    </div>
                    <div className="space-x-5 mt-10 w-1/3">
                        <Image width={582} height={652} className=" max-h-[650px] w-full" unoptimized alt="asfas" src={"/images/mask2.png"} />
                        <div className="flex justify-between mt-10 ">
                            <p className="text-[24px] font-gotham  " >Найвигідніші та перспективні обʼєкти з прозорою економікою.</p>
                            <p className="text-right text-[50px] leading-[110px] " >02</p>
                        </div>
                        {/* <div className="w-1/2"> */}
                        {/* </div> */}
                    </div>
                    <div className=" space-x-5 mt-10 w-1/3">
                        <Image width={581} height={446} className=" my-2.5 w-full" unoptimized alt="asfas" src={"/images/mask3.png"} />
                        <div className="flex justify-between mt-10 ">
                            <p className="text-[24px] font-gotham  " >Найвищій рівень юридичної підтримки в усіх угодах. Гарантії комерційної таємниці.</p>
                            <p className="text-right text-[50px] leading-[110px] " >03</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}