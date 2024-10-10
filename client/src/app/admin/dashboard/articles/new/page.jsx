"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ArticleForm = dynamic(() => import("../ArticleForm"), { ssr: false });

export default function NewArticlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleForm />
    </Suspense>
  );
}
