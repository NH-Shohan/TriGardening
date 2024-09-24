"use client";

import { Button } from "@/components/ui/button";
import ContentForm from "@/components/ui/content-form";
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
import { Textarea } from "@/components/ui/textarea";
import { NotePencil } from "@phosphor-icons/react";
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
  const [files, setFiles] = useState();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  console.log(content);

  const router = useRouter();
  const textareaRef = useRef(null);

  const currentDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleFileUpload = (files) => {
    setFiles(files);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
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
    const postData = {
      files,
      title,
      slug,
      selectedCategory,
      content: editorContent,
      isPreview,
      isEditable,
      currentDate,
    };
    console.log(postData);
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

      <div className="py-4 text-sm text-neutral-500 flex justify-between items-center">
        <div className="flex w-full items-center">
          <p>https://trigardeningbd.com/</p>
          <div className="flex-grow">
            <Input
              value={slug}
              onChange={handleSlugChange}
              disabled={!isEditable}
              className="w-full p-0 border-none ring-0 h-fit focus-visible:ring-0 rounded-none"
            />
          </div>
        </div>
        {slug && (
          <NotePencil
            size={16}
            weight="bold"
            className="cursor-pointer w-fit ml-2"
            onClick={handleEditClick}
          />
        )}
      </div>

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
            {categoryOptions.map((category, index) => (
              <SelectItem key={index} value={category}>
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
