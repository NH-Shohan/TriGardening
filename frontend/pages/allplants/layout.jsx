import Modal from "@/components/Modal";
import Link from "next/link";
import { useState } from "react";

const AllPlantsLayout = ({ children }) => {
  const categories = [
    "All Plants",
    "Indoor Plants",
    "Outdoor Plants",
    "Medicinal Plants",
    "Herbs",
  ];
  const topResearchers = ["Shohan", "Shagor", "Prosit", "Sumaya", "Nahim"];
  const settings = [
    {
      name: "General Settings",
      path: "/generalSettings",
    },
    {
      name: "Security Settings",
      path: "/securitySettings",
    },
    {
      name: "Privacy Policy",
      path: "/privacyPolicy",
    },
    {
      name: "Give Feedback",
      path: "/giveFeedback",
    },
  ];

  const [isOpen, toggle] = useState(false);

  function handlOpenModal(open) {
    console.log("close modal");
    toggle(open);
  }

  return (
    <div className="container mx-auto grid grid-cols-12 mt-5 gap-6 h-[calc(100vh-90px)]">
      <div className="col-span-3">
        <div className="border border-gray-light p-6 rounded-2xl">
          <p className="body-small-bold text-primary mb-2">Category</p>
          <div className="ml-1">
            {categories.map((category, index) => (
              <button
                key={index}
                className="body-small hover:text-primary hover:bg-secondary hover:font-medium w-full text-left block py-1 pl-3 rounded-md"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-gray-light p-6 rounded-2xl mt-6">
          <p className="body-small-bold text-primary mb-2">Top Researchers</p>
          <div className="ml-4">
            {topResearchers.map((topResearcher, index) => (
              <p key={index} className="body-small text-left block my-2">
                {topResearcher}
              </p>
            ))}
          </div>
        </div>

        <div className="border border-gray-light p-6 rounded-2xl mt-6">
          <p className="body-small-bold text-primary mb-2">Settings</p>
          <div className="ml-1">
            {settings.map((item, index) => (
              <button
                key={index}
                className="body-small hover:text-primary hover:bg-secondary hover:font-medium w-full text-left block py-1 pl-3 rounded-md"
              >
                <Link href={item.path}>{item.name}</Link>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <div className="border border-gray-light w-full flex gap-6 p-7 rounded-2xl mb-6">
          <div className="bg-gray-light w-11 h-11 rounded-lg"></div>
          <button
            className="w-full h-11 rounded-lg pl-4 text-left body-small bg-gray-light"
            onClick={() => handlOpenModal(true)}
          >
            Shohan, Share your research...
          </button>
          <Modal isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
            <p> Awesome modal </p>
          </Modal>
        </div>
        <div className="overflow-y-scroll h-[calc(100vh-216px)] no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AllPlantsLayout;
