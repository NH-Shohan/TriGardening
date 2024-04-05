import BlogCardsSmall from "@/pages/blogs/blogCardSmall";
import blogdata from "../../data/blogdata.json";

const Blogs = () => {
  return (
    <main className="container mx-auto">
      <h1 className="text-center mb-10">
        Our <span className="text-primary">Plants</span> Your{" "}
        <span className="text-primary">Stories</span>
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {blogdata.map((blog, index) => (
          <BlogCardsSmall
            index={index}
            key={index}
            image={blog.imageUrl}
            title={blog.title}
            date={blog.date}
            content={blog.content}
          />
        ))}
      </div>
    </main>
  );
};

export default Blogs;
