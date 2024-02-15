import Card from "@/components/Card";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import cardlist from "../../data/cardlist.json";

const HomeHomeCard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h4>
          Best <span className="text-primary">Seller</span>
        </h4>
        <Link
          href="/allplants"
          className="text-primary body-bold flex gap-2 items-center"
        >
          See All Plants
          <IoArrowForwardCircleOutline className="text-3xl" />
        </Link>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {cardlist.map((card) => (
          <Card
            image={card.image}
            title={card.title}
            avilable={card.avilable}
            in_stock={card.in_stock}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeHomeCard;
