import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const HomeFirst = () => {
  return (
    <div className=" bg-light flex gap-2 pt-10 pl-10 m-4 shadow rounded-md">
        <div className="text-start items-center">
          <h3 className="text-dark  ">
            Tri <br /> Gardening
          </h3>
          <p className="text-primary py-4 mt-5 mb-16">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
            tempora non quisquam asperiores atque ea numquam et neque laborum ad
            culpa, nostrum nisi fugiat recusandae sunt eos provident pariatur.
            Hic.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate tempora non quisquam asperiores atque ea numquam et neque
            laborum ad culpa.
          </p>
          <button>
            <Link
              href="/allplants"
              className="bg-primary rounded-md p-2 text-light "
            >
              See Plants
            </Link>
          </button>
        </div>
        <div className="text-center items-center">
          {" "}
          <Image
            src="/1312869_1-removebg.png"
            alt="image "
            width={3000}
            height={802}
          />
        </div>
      </div>
  );
};

export default HomeFirst;