"use client";

import { Button } from "@/components/ui/button";
import { CaretLeft } from "@phosphor-icons/react";
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
      <div className="space-y-5 container mx-auto">
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
      <Footer />
    </>
  );
};

export default ArticleDetails;
