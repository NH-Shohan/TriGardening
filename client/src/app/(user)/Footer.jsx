"use client";

import leafShing from "@/assets/leafShing.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-green-950 relative mt-24 pt-16 flex flex-col gap-10 justify-between">
      <div>
        <div className="space-y-4 text-center relative">
          <Image
            src={leafShing}
            alt="leafShing"
            className="absolute w-24 top-0 right-[20%] hidden lg:block"
            priority
          />
          <Image
            src={leafShing}
            alt="leafShing"
            className="absolute w-24 top-0 left-[20%] scale-x-[-1] hidden lg:block"
            priority
          />

          <h3 className="text-white text-center leading-tight">
            Join Our <br /> <span className="text-green-600">Subscription</span>
          </h3>
          <p className="text-green-300">
            We will send you monthly update of plants and news events.
          </p>
        </div>

        <div className="flex justify-center w-full">
          <div className="flex justify-center w-fit mt-12">
            <Input
              placeholder="example@gmail.com"
              className="w-full md:w-[320px] rounded-tl-full rounded-bl-full bg-gray-50 px-4 focus-visible:ring-0"
            />
            <Button className="rounded-tr-full rounded-br-full bg-green-300 text-green-900 hover:text-green-50">
              Join Now
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-5 justify-center w-full md:w-fit mx-auto mt-12 gap-4">
          <Button className="rounded-full bg-green-100 text-green-600 hover:text-green-50 gap-2 px-8">
            <YoutubeLogo size={24} weight="duotone" />
            YouTube
          </Button>
          <Button className="rounded-full bg-green-100 text-green-600 hover:text-green-50 gap-2 px-8">
            <FacebookLogo size={24} weight="duotone" />
            Facebook
          </Button>
          <Button className="rounded-full bg-green-100 text-green-600 hover:text-green-50 gap-2 px-8">
            <LinkedinLogo size={24} weight="duotone" />
            Linkedin
          </Button>
          <Button className="rounded-full bg-green-100 text-green-600 hover:text-green-50 gap-2 px-8">
            <InstagramLogo size={24} weight="duotone" />
            Instagram
          </Button>
        </div>
      </div>

      <h1 className="text-green-900 text-center text-[16vw] tracking-tighter pb-8">
        TriGardening
      </h1>
    </div>
  );
};

export default Footer;
