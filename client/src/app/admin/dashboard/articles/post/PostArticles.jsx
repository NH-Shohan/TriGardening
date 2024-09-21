"use client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CaretLeft, Dot } from "@phosphor-icons/react/dist/ssr";
import { Bricolage_Grotesque } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import articles from "../../../../../data/articles.json";

const categoryOptions = [
  ...new Set(articles.map((article) => article.category)),
];

const bricolageGrotesque = Bricolage_Grotesque({
  // weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const PostArticles = () => {
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div>
      <Button variant="outline" className="flex gap-1" onClick={router.back}>
        <CaretLeft weight="bold" />
        <p>Back</p>
      </Button>

      <Input
        className={`border-0 border-b rounded-none ${bricolageGrotesque.className} text-5xl my-8 focus-visible:ring-0 font-semibold px-0 py-10`}
        placeholder="Title of the article"
      />

      <div className="flex items-center">
        <Select
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            <SelectSeparator />
            {categoryOptions.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dot className="text-neutral-500" size={42} weight="bold" />

        <p className="text-neutral-500">{currentDate}</p>
      </div>

      <div className="w-full max-w-2xl mx-auto min-h-96 border-2 border-dashed bg-neutral-50 border-green-500 rounded-xl my-10">
        <FileUpload onChange={handleFileUpload} />
      </div>

      <Separator />
    </div>
  );
};

export default PostArticles;
