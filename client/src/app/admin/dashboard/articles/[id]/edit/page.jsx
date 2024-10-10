"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ArticleForm = dynamic(() => import("../../ArticleForm"), { ssr: false });

export default function EditArticlePage({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleForm productId={params.id} />
    </Suspense>
  );
}
