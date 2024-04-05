import Image from "next/image";
import { useEffect, useState } from "react";
import { GoReply } from "react-icons/go";
import data from "../../data/allPlants";
import AllPlantsLayout from "./layout";

const AllPlants = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [likes, setLikes] = useState(data.map((item) => item.like));
  const [dislikes, setDislikes] = useState(data.map((item) => item.dislike));
  const [sortedData, setSortedData] = useState([]);

  const handleComment = () => {
    setIsCommenting(true);
  };

  const handleLike = (index) => {
    if (likes[index] > 0) {
      const newLikes = [...likes];
      newLikes[index] += 1;
      setLikes(newLikes);
    }
  };

  const handleDislike = (index) => {
    if (dislikes[index] > 0) {
      const newDislikes = [...dislikes];
      newDislikes[index] -= 1;
      setDislikes(newDislikes);
    }
  };

  useEffect(() => {
    const sorted = data
      .map((item, index) => ({ ...item, index }))
      .sort((a, b) => {
        const rateA = likes[a.index] / +dislikes[a.index];
        const rateB = likes[b.index] / +dislikes[b.index];
        return rateB - rateA;
      });
    setSortedData(sorted);
  }, [data, likes, dislikes]);

  return (
    <AllPlantsLayout>
      {sortedData.length > 0 && (
        <>
          {sortedData.map((plantData, index) => (
            <div
              key={plantData.id || index}
              className="border border-gray-light rounded-2xl p-6 space-y-4 mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-gray-light rounded-lg relative overflow-hidden">
                  <Image src={plantData.profilePic} alt="Profile Pic" fill />
                </div>
                <div className="leading-tight">
                  <p className="text-[20px] font-medium">{plantData.name}</p>
                  <p className="text-[14px] text-gray">Posted 3 days ago</p>
                </div>
              </div>
              <div>
                <p className="body-small text-ellipsis overflow-hidden h-20 w-full">
                  {plantData.text.substring(0, 300) + "..."}
                </p>
              </div>
              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <Image src={plantData.plantImage} alt="Plant Image" fill />
              </div>

              <div className="flex gap-10 body-small">
                <button onClick={() => handleLike(index)}>
                  <div className="flex gap-2">
                    <Image
                      src={"/like.svg"}
                      alt="Icon"
                      width={24}
                      height={24}
                    />
                    <p>
                      {likes[index] > 1000
                        ? likes[index] / 1000 + "k"
                        : likes[index]}{" "}
                      Up
                    </p>
                  </div>
                </button>

                <button onClick={() => handleDislike(index)}>
                  <div className="flex gap-2">
                    <Image
                      src={"/dislike.svg"}
                      alt="Icon"
                      width={24}
                      height={24}
                    />
                    <p>
                      {dislikes[index] > 1000
                        ? dislikes[index] / 1000 + "k"
                        : dislikes[index]}{" "}
                      Down
                    </p>
                  </div>
                </button>

                <button onClick={handleComment}>
                  <div className="flex gap-2">
                    <Image
                      src={"/comment.svg"}
                      alt="Icon"
                      width={24}
                      height={24}
                    />
                    <p>
                      {plantData.comment > 1000
                        ? plantData.comment / 1000 + "k"
                        : plantData.comment}{" "}
                      Comments
                    </p>
                  </div>
                </button>

                <div className="flex gap-2">
                  <Image src={"/link.svg"} alt="Icon" width={24} height={24} />
                  <p>Share Link</p>
                </div>
              </div>

              {isCommenting && (
                <div>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="3"
                    className="w-full border-gray-light border rounded-xl text-sm p-3 outline-none"
                    placeholder="Type your comment..."
                  />
                  {showReply && (
                    <div className="ml-10">
                      <textarea
                        name="reply"
                        id="reply"
                        rows="3"
                        className="w-full border-gray-light border rounded-xl text-sm p-3 outline-none"
                        placeholder="Type your reply..."
                      />
                      <>
                        <div className="flex gap-2 font-normal">
                          <div
                            onClick={() => setShowReply(true)}
                            className="text-sm -mt-1 ml-4 flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            <p>Reply</p>
                            <GoReply className="rotate-180 mt-1" />
                          </div>
                          <div
                            onClick={() => setShowReply(false)}
                            className="text-sm -mt-1 ml-4 flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            <p>Cancel</p>
                          </div>
                        </div>
                      </>
                    </div>
                  )}
                  {!showReply && (
                    <>
                      <div className="flex gap-2 font-normal">
                        <div
                          onClick={() => setShowReply(true)}
                          className="text-sm -mt-1 ml-4 flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <p>Reply</p>
                          <GoReply className="rotate-180 mt-1" />
                        </div>
                        <div
                          onClick={() => setIsCommenting(false)}
                          className="text-sm -mt-1 ml-4 flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <p>Cancel</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </AllPlantsLayout>
  );
};

export default AllPlants;
