import Modal from "@/components/Modal";
import { useState } from "react";
import Filter from "./Filter";
import PostModal from "./PostModal";

const AllPlantsLayout = ({ children }) => {
  const [isOpen, toggle] = useState(false);

  function handlOpenModal(open) {
    toggle(open);
  }

  return (
    <div className="container mx-auto grid grid-cols-12 mt-5 gap-6 h-[calc(100vh-90px)]">
      <Filter />

      <div className="col-span-9">
        <div className="border border-gray-light w-full flex gap-6 p-7 rounded-2xl mb-6">
          <div className="bg-gray-light w-11 h-11 rounded-lg"></div>
          <button
            className="w-full h-11 rounded-lg pl-4 text-left body-small bg-gray-light"
            onClick={() => handlOpenModal(true)}
          >
            Shohan, Share your plants...
          </button>
          <Modal isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
            <PostModal />
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
