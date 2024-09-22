"use client";

import { Button } from "@/components/ui/button";
import ContentForm from "@/components/ui/content-form";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CaretLeft, Dot } from "@phosphor-icons/react/dist/ssr";
import DOMPurify from "dompurify";
import { Bricolage_Grotesque } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import articles from "../../../../../data/articles.json";

const categoryOptions = [
  ...new Set(articles.map((article) => article.category)),
];

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const PostArticles = () => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const router = useRouter();
  const textareaRef = useRef(null);

  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generatedSlug);
  }, [title]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = (editorContent) => {
    setContent(editorContent);
    setIsPreview(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="outline" className="flex gap-1" onClick={router.back}>
        <CaretLeft weight="bold" />
        <p>Back</p>
      </Button>

      <Textarea
        ref={textareaRef}
        className={`border-0 border-b rounded-none ${bricolageGrotesque.className} text-5xl mt-8 focus-visible:ring-0 font-semibold px-0 py-10`}
        placeholder="Title of the article"
        onChange={(e) => setTitle(e.target.value)}
        onInput={autoResizeTextarea}
      />

      <p className="py-4 text-sm text-neutral-400">
        https://trigardeningbd.com/{slug}
      </p>

      <div className="flex items-center max-w-2xl">
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

      <div className="w-full h-full">
        <ContentForm onSubmit={handleSubmit} />
      </div>

      {/* Preview Section */}
      {isPreview && (
        <div className="preview mt-10 p-4 border-t">
          <h2 className="text-2xl font-bold">Preview of your Article</h2>
          <h3 className="text-3xl mt-4 font-semibold">{title}</h3>
          <p className="text-neutral-500 mt-2">
            URL: https://trigardeningbd.com/{slug}
          </p>
          <p className="text-neutral-500 mt-2">
            Category: {selectedCategory} | Date: {currentDate}
          </p>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      )}
    </div>
  );
};

export default PostArticles;
