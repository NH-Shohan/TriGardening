"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import articles from "../../data/articles.json";

const RecentArticles = () => {
  return (
    <div className="h-fit mb-24">
      <h3>
        Recent <span className="text-green-600">Articles</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
        {articles.map((article, index) => (
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
            <h4 className="text-ellipsis line-clamp-2">{article.title}</h4>
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
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;
