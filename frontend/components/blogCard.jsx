// components/BlogCard.js
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { image } from "../public/blog.svg";

const BlogCard = () => {
  return (
    <div className="relative max-w-full  overflow-hidden flex" >
      <Image
          className="width-full"
          src={image}
          alt="plant image"
         
        />
      <div className="absolute w-1/2 px-8 py-8 mr-b">
        <Image
          className="rounded-t-3xl"
          src="/blog.png"
          alt="plant image"
          width={249}
          height={375}
        />
      
        <div className="w-1/2 py-8 mr-b">
            <div className="body-bold">Title of the blog</div>
            <div className="text-green-500 text-sm font-bold"><FontAwesomeIcon icon={faClock} /> Posted on <span className="text-gray-600">06 Dec, 2023</span></div>
        
          <p className="body-small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
