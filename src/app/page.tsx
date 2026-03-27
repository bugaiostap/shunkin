import Header from "../components/Header"
import Home1 from "../components/Home"
import WhyChooseUs from "../components/WhyChooseUs"
import Responsibilities from "../components/Responsibilities"
import Steps from "../components/Steps"
import Form from "../components/Form"
import Footer from "../components/Footer"
import BlockTwo from "@/components/SecondSection"
import BlockThree from "@/components/BlockThree"
import BlockFourth from "@/components/Carousel"
import BlockFive from "@/components/BlockFive"
import Image from "next/image"
import RealEstateBlock from "../components/Home"
import RealEstateBlockDesktop from "@/components/HeroSectionDesktop"
import FooterDesctop from "@/components/FooterDesctop"
export default function Home() {
  return (
    <div className="scroll-smooth w-full">
      <RealEstateBlock />
      <RealEstateBlockDesktop />
      <BlockTwo />
      <BlockThree />
      <BlockFourth />
      <BlockFive />
      <Form />
      <Footer />
      <FooterDesctop />
    </div>
  );
}
