import Image from "next/image";
import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Button from "./Button";

const Card = ({ image, title, avilable, in_stock, description }) => {
  const [favorite, setFavorite] = useState();

  return (
    <div className="rounded-3xl border border-gray-light bg-[#fff] hover:shadow-[inset_0_0px_10px_0px_rgba(0,122,0,0.302)] hover:bg-light relative">
      <div
        className="absolute top-5 right-5 z-50"
        onClick={() => setFavorite(!favorite)}
      >
        {!favorite ? (
          <FaRegHeart className="text-red text-3xl cursor-pointer" />
        ) : (
          <FaHeart className="text-red text-3xl cursor-pointer" />
        )}
      </div>

      <div className="relative m-3">
        <Image
          className="rounded-t-3xl"
          src={image}
          alt="plant image"
          width={500}
          height={602}
        />
      </div>

      <div className="p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="body-bold text-black">{title}</p>
          {!avilable ? (
            <span className="bg-red-light text-red rounded-full border border-red text-[11px] font-bold px-2 py-[2px] h-fit">
              {"Unavailable"}
            </span>
          ) : (
            <span className="bg-light text-primary rounded-full border border-primary text-[11px] font-bold px-2 py-[2px] h-fit">
              {"Available"}
            </span>
          )}
        </div>
        <p className="body-small text-gray">{description}</p>
        <p className="text-black body-small-bold">
          In Stock -{" "}
          {in_stock === 0 ? (
            <span className="text-red">{in_stock} (Out of Stock)</span>
          ) : (
            <span className="text-primary">{in_stock}</span>
          )}
        </p>
      </div>

      <div className="mx-6 mb-6 flex gap-4">
        <Button
          outline
          className={"rounded-lg flex justify-center items-center h-full w-16"}
        >
          <BsCart4 className="text-2xl" />
        </Button>
        <Button outline className={"w-full rounded-lg"}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default Card;
