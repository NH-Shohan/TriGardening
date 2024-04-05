import bgImage from "@/public/blog.svg";
import bgImageWhite from "@/public/blogWhite.svg";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";

const BlogCardSmall = ({ index, image, title, date, content }) => {
  return (
    <div
      className={`w-full relative overflow-hidden ${
        index === 0 && "col-span-2 row-span-2"
      }`}
    >
      <Image
        src={index === 0 ? bgImage : bgImageWhite}
        alt="File"
        className={`w-full h-full`}
      />

      <div
        className={`absolute z-10 top-10 p-10 w-full ${
          index < 1 && "grid grid-cols-2 lg:p-36 gap-4 md:p-20 sm:p-6"
        }`}
      >
        {index < 1 && (
          <Image
            src={image}
            alt="Plant Image"
            width={100}
            height={100}
            className="rounded-md w-auto h-96"
          />
        )}
        <div>
          <div
            className={`${
              index === 0 ? "text-4xl font-bold" : "font-semibold text-2xl mt-2"
            }`}
          >
            {title}
          </div>
          <div className="text-green-500 text-sm font-bold flex items-center gap-1">
            <FaRegClock className="text-green-500" />
            Posted on <span className="text-gray-600">{date}</span>
          </div>
          <p className={`${index === 0 ? "mt-6" : "body-small mt-3"}`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSmall;
