import React from "react";
import Link from "next/link";
import Image from "next/image";
// import cardlist from "./Data";
const HomeCard = () => {
  const cardlist = [
    {
      id: 1,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 6,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 2,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 47,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 3,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 50,
      avilable: true,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 4,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 86,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 5,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 19,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 6,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 70,
      avilable: true,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 7,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 57,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 8,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 19,
      avilable: true,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 9,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 29,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 10,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 72,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 11,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 56,
      avilable: true,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 12,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 3,
      avilable: true,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 13,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 95,
      avilable: true,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 14,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 77,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
    {
      id: 15,
      title: "Spider Plant",
      description:
        "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      in_stock: 91,
      avilable: false,
      image: "/Spider Plant 1.jpg",
    },
  ];
  return (
    <div className="pt-10 px-20 m-4">
      <div className="flex justify-between items-center w-[92%] mx-auto">
        <h4>
          Best <span className="text-primary">Seller</span>
        </h4>
        <Link href="/allplants" className=" p-2 text-primary font-bold">
          {" "}
          See All Plants-
        </Link>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {cardlist.map((card) => (
          <div className="shadow-lg rounded-lg hover:border-purple-900 hover:border">
            {" "}
            <Image
              className="rounded-t-lg"
              src={card.image}
              alt="plant image "
              width={500}
              height={602}
            />
            <div className="p-5">
              <div className="flex">
                <p className="text-xl font-bold text-slate-700 mb-3 ">
                  {card.title}
                </p>
                <button
                  style={{ fontSize: "9px" }}
                  className="bg-light text-primary p-1 rounded border border-primary font-bold my-2 mx-3"
                >
                  Avilable{card.avilable}
                </button>
              </div>
              <button
                style={{ fontSize: "15px" }}
                className="mt-2 text-primary "
              >
                In Stock- {card.in_stock}
              </button>
              <p
                style={{ fontSize: "12px" }}
                className="text-sm font-normal text-gray-600 "
              >
                {card.description}
              </p>
            </div>
            <div className="flex gap-6 mx-4 mb-2">
              <Link href="/cart"><button className="border rounded text-primary border-primary px-5 items-start text-left hover:bg-primary hover:text-light">Cart</button></Link>
              <Link href="/buy"><button className=" border rounded text-primary border-primary px-24 items-end text-right hover:bg-primary hover:text-light ">Buy Now</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
