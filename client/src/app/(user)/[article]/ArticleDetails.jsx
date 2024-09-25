"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CaretLeft } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import articles from "../../../data/articles.json";
import Footer from "../Footer";

const ArticleDetails = () => {
  const [headings, setHeadings] = useState([]);
  const router = useRouter();
  const params = useParams();
  const article = articles.find((article) => article.slug === params.article);
  const category = article.category;
  const slug = params.article;

  if (!article) {
    return <div>Article not found</div>;
  }

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content, "text/html");

    const headingTags = doc.querySelectorAll("h3, h4, h5");
    const headingContent = Array.from(headingTags).map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id);
      return { id, text: heading.textContent };
    });

    article.content = doc.body.innerHTML;

    setHeadings(headingContent);
  }, [article.content]);

  return (
    <>
      <div className="space-y-5 container mx-auto px-5">
        <Button
          variant="outline"
          className="flex gap-1 mt-10"
          onClick={() => router.push("/")}
        >
          <CaretLeft weight="bold" />
          <p>Back</p>
        </Button>

        <div className="space-y-0">
          <h2>{article.title}</h2>

          <div className="flex items-center gap-3">
            <b className="text-blue-500">{article.category}</b>
            <b className="text-neutral-500 text-xl">•</b>
            <p className="text-neutral-500">{article.date}</p>
          </div>
        </div>

        <div className="w-full h-full aspect-video rounded-3xl overflow-hidden border bg-white">
          <Image
            src={article.files.url}
            alt={article.files.name}
            className="w-full h-full object-contain"
            width={100}
            height={100}
          />
        </div>

        <div className="flex gap-10 relative">
          <div className="w-fit sticky top-2 self-start">
            {headings.map((heading) => (
              <Link
                key={heading.id}
                href={`#${heading.id}`}
                className="text-xl font-medium hidden lg:block cursor-pointer my-2 text-neutral-500 hover:text-neutral-900 hover:border-l-2 border-l-2 border-opacity-0 pl-2 py-1 bg-neutral-100 hover:border-l-green-500 transition-all duration-300"
              >
                {heading.text}
              </Link>
            ))}
          </div>

          <div
            className="flex-1 space-y-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>

      <div className="container mx-auto mt-20 space-y-5 px-5">
        <h3>
          Recommended <span className="text-green-600">Articles</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {articles
            .filter(
              (article) =>
                article.status.toLowerCase() === "visible" &&
                article.category.toLowerCase() === category.toLowerCase() &&
                article.slug !== params.article
            )
            .slice(0, 4)
            .map((article, index) =>
              article ? (
                <div
                  key={index}
                  className="border bg-neutral-50 rounded-xl p-3 space-y-3"
                >
                  <Image
                    src={article.files.url}
                    alt={article.files.name}
                    className="w-full h-auto rounded-lg"
                    width={100}
                    height={100}
                  />
                  <div className="flex justify-between">
                    <small className="text-green-600 font-semibold">
                      {article.category}
                    </small>
                    <small className="text-neutral-500">{article.date}</small>
                  </div>
                  <h4 className="text-ellipsis line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-ellipsis line-clamp-3 text-neutral-500">
                    {article.description}
                  </p>
                  <Link
                    href={`/${article.slug.replace(/ /g, "-").toLowerCase()}`}
                    className="flex items-center gap-1 text-blue-600 font-semibold w-fit"
                  >
                    Read More <ArrowRight weight="bold" className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div key={index}>
                  <p>No articles found</p>
                </div>
              )
            )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ArticleDetails;
