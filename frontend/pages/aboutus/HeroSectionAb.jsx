import React from "react";
import Image from "next/image";
import Button from "../../components/Button";

const HeroSectionAb = () => {
  return (
    <div className="bg-light flex items-center gap-12 m-7 p-16 h-[calc(100vh-126px)] shadow-inside rounded-2xl relative overflow-hidden">
    
        <Image
          className=""
          src="/Group.png"
          alt="Hero image"
          width={450}
          height={802}
        />
   
      <div className="absolute right-3 w-1/2 flex flex-col gap-14">
        <h1 className="text-dark leading-[50px]">
          Tri Gardening
        </h1>
        <p className="w-2/3">
          At Tri Gardening, we believe in the transformative power of plants.
          Our journey began with a simple yet profound idea — to share the
          wonders of the botanical world and encourage a greener, more
          sustainable planet. With a passion for plant care and a commitment to
          environmental stewardship, we embarked on a mission to provide
          comprehensive plant information to enthusiasts and novices alike.
        </p>

        <Button href="/allplants" className="w-1/4">
          See Plants
        </Button>
      </div>
    </div>
  );
};

export default HeroSectionAb;
