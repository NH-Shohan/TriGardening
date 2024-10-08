import Image from "next/image";
import Button from "../../components/Button";

const HeroSection = () => {
  return (
    <div className="bg-light flex items-center gap-2 m-7 p-16 h-[calc(100vh-126px)] shadow-inside rounded-2xl relative overflow-hidden">
      <div className="container mx-auto">
        <div className="w-1/2 flex flex-col gap-14">
          <h1 className="text-dark leading-[120px] text-9xl">
            Tri <br /> Gardening
          </h1>
          <p>
            Rorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.
          </p>

          <Button href="/allplants" className="w-1/4">
            See Plants
          </Button>
        </div>

        <Image
          className="absolute bottom-0 right-3 h-full w-fit"
          src="/heroImage.svg"
          alt="Hero image"
          width={5000}
          height={802}
        />
      </div>
    </div>
  );
};

export default HeroSection;
