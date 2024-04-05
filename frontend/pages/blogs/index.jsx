import Card from "@/components/Card";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import cardlist from "../../data/cardlist.json";
import Image from "next/image";
import BlogCards from "@/components/blogCard";
import BlogCardsSmall from "@/components/blogCardSmall";
import blogdata from "../../data/blogdata.json";

const Blogs = () => {
  return (
    <main>
  <h1 className="text-center mb-10">
    Our <span className="text-primary">Plants</span> Your <span className="text-primary">Stories</span>
  </h1>
  <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
    <div class="">
      <BlogCards />
    </div>
  </div>
  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
  {blogdata.map((blog, index) => (
    <div key={index}>
      <BlogCardsSmall
        title={blog.title}
        date={blog.date}
        content={blog.content}
      />
    </div>
  ))}
</div>

</main>

  );
};

export default Blogs;
