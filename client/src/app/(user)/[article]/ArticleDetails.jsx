"use client";

import { useParams } from "next/navigation";

const ArticleDetails = () => {
  const params = useParams();

  return (
    <>
      <div>My Post: {params.article}</div>
    </>
  );
};

export default ArticleDetails;
