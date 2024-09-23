import heroLeaf from "@/assets/heroLeaf.svg";
import heroMiddleLeaf from "@/assets/heroMiddleLeaf.svg";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="text-center mx-auto h-[80vh] bg-neutral-100">
      <Image
        src={logo}
        alt="hero leaf"
        className="absolute top-4 left-[12%] z-20 w-48"
      />
      <div className="grid place-content-center h-full w-full dark:bg-black bg-grid-neutral-500/[0.2] relative">
        <div className="z-20 space-y-8">
          <h1 className="text-[8vw]">
            Harness the power <br /> of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-700 to-green-600">
              gardening
            </span>
          </h1>

          <h5>
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit <br /> interdum, ac aliquet odio mattis.
            Class aptent taciti sociosqu <br />
            ad litora torquent per conubia nostra.
          </h5>

          <Button className="bg-green-50 hover:bg-green-100 border border-green-600 text-green-600 rounded-full px-5 space-x-2">
            <span className="text-[10px]">🟢</span> <p>GET IN TOUCH</p>
          </Button>

          <Image
            src={heroMiddleLeaf}
            alt="middle leaf image"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 g-green-50 pointer-events-none"
          />

          <Image
            src={heroLeaf}
            alt="middle leaf image"
            className="mx-auto pointer-events-none absolute right-[0%] xl:bottom-[30%] lg:bottom-[10%] w-64 hidden lg:block"
          />
          <Image
            src={heroLeaf}
            alt="middle leaf image"
            className="mx-auto pointer-events-none absolute left-[0%] xl:bottom-[30%] lg:bottom-[10%] w-64 hidden lg:block scale-x-[-1]"
          />
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]"></div>
      </div>
    </div>
  );
};

export default HeroSection;
