"use client";

import ArticleForm from "../../ArticleForm";

export default function EditArticlePage({ params }) {
  return <ArticleForm productId={params.id} />;
}
