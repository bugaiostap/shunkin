import React from 'react'
import Carousel from './FourthCarousel'
import CarouselDesktop from './CarouselDesktop'

const BlockFourth = () => {
    return (
        <>
            <div id='objects' className='bg-[#151515] w-full py-24 text-white block md:hidden'>
                <div className="text-[30px] uppercase leading-[34px]  px-4  mx-auto">
                    <p>об’єкти,<br />що варто</p>
                    {/* <p></p> */}
                    <p className='text-right md:text-left'>побачити</p>
                    <div className="font-gotham text-right  md:text-left font-light pr-16 text-xs">колекція нерухомості,<br /> яка вражає</div>
                </div>
                <Carousel />
            </div>
            <div id='objects' className='bg-[#151515] w-full py-32 text-white hidden md:block'>

                <CarouselDesktop />
            </div>
        </>
    )
}

export default BlockFourth