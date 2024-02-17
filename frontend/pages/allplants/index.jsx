import Image from "next/image";
import AllPlantsLayout from "./layout";
import data from "../../data/allPlants";

const AllPlants = () => {
  return (
    <AllPlantsLayout>
      {data.map((data, index) => (
        <div
          key={index}
          className="border border-gray-light rounded-2xl p-6 space-y-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gray-light rounded-lg relative overflow-hidden">
              <Image src={data.profilePic} alt="Profile Pic" fill />
            </div>
            <div className="leading-tight">
              <p className="text-[20px] font-bold">{data.name}</p>
              <p className="text-[14px] text-gray">Posted 3 days ago</p>
            </div>
          </div>
          <div>
            <p className="body-small text-ellipsis overflow-hidden h-20 w-full">
              {data.text.substring(0, 300) + "..."}
            </p>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden">
            <Image src={data.plantImage} alt="Plant Image" fill />
          </div>

          <div className="flex gap-10 body-small">
            <div className="flex gap-2">
              <Image src={"/like.svg"} alt="Icon" width={24} height={24} />
              <p>{data.like > 1000 ? data.like / 1000 + "k" : data.like} Up</p>
            </div>
            <div className="flex gap-2">
              <Image src={"/dislike.svg"} alt="Icon" width={24} height={24} />
              <p>
                {data.dislike > 1000 ? data.dislike / 1000 + "k" : data.dislike}{" "}
                Down
              </p>
            </div>
            <div className="flex gap-2">
              <Image src={"/comment.svg"} alt="Icon" width={24} height={24} />
              <p>
                {data.comment > 1000 ? data.comment / 1000 + "k" : data.comment}{" "}
                Comments
              </p>
            </div>
            <div className="flex gap-2">
              <Image src={"/link.svg"} alt="Icon" width={24} height={24} />
              <p>Share Link</p>
            </div>
          </div>
        </div>
      ))}
    </AllPlantsLayout>
  );
};

export default AllPlants;
