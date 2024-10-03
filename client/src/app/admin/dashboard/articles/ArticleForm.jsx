"use client";

import { Button } from "@/components/ui/button";
import ContentForm from "@/components/ui/content-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  getCategories,
  getProductById,
  postProduct,
  updateProduct,
} from "@/lib/apiService";
import { CaretLeft, Dot, NotePencil } from "@phosphor-icons/react";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const ArticleForm = ({ productId }) => {
  const [slug, setSlug] = useState("");
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [actionType, setActionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const router = useRouter();
  const textareaRef = useRef(null);

  const isEditing = !!productId;

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

  const handleContentChange = (newContent) => {
    setEditorContent(newContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [fetchedCategories, productData] = await Promise.all([
          getCategories(),
          isEditing ? getProductById(productId) : Promise.resolve(null),
        ]);

        console.log(productData);

        setCategories(fetchedCategories);

        if (productData) {
          setTitle(productData.title);
          setSlug(productData.slug);
          setEditorContent(JSON.parse(productData.content || "{}"));
          setFiles(productData.files || []);
          setSelectedCategory(productData.category.name);

          const category = fetchedCategories.find(
            (c) => c.id === productData.categoryId
          );
          if (category) {
            setSelectedCategory(category.name);
          }
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId, isEditing]);

  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  }, [title]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async () => {
    const selectedCategoryObj = categories.find(
      (category) => category.name === selectedCategory
    );
    const categoryId = selectedCategoryObj ? selectedCategoryObj.id : null;

    const postData = {
      title: title || "Untitled",
      slug: slug || "untitled",
      categoryId: categoryId || null,
      files: files || [],
      content: JSON.stringify(editorContent),
      date: currentDate,
      status: "visible",
    };

    try {
      if (isEditing) {
        await updateProduct(productId, postData);
        toast.success("Article updated successfully!");
      } else {
        await postProduct(postData);
        toast.success("Article created successfully!");
      }
      router.push("/admin/dashboard/articles");
    } catch (error) {
      toast.error(
        isEditing ? "Error updating article!" : "Error posting article!"
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSaveAsDraft = async () => {
    const postData = {
      title: title || "Untitled",
      slug: slug || "untitled",
      categoryId: null,
      files: files || [],
      content: content || "",
      date: currentDate,
      status: "draft",
    };

    try {
      if (isEditing) {
        await updateProduct(productId, postData);
        toast.success("Article updated successfully!");
      } else {
        await postProduct(postData);
        toast.success("Draft saved successfully!");
      }
      router.push("/admin/dashboard/articles");
    } catch (error) {
      toast.error("Error saving draft!");
    }
  };

  const handleBack = () => {
    if (title || slug || content || files.length > 0) {
      setActionType("back");
      setDialogOpen(true);
    } else {
      router.back();
    }
  };

  const handleCreate = () => {
    setActionType("create");
    setContent(content);
    setDialogOpen(true);
  };

  const handleDialogConfirm = () => {
    if (actionType === "back") {
      handleSaveAsDraft();
    } else if (actionType === "create") {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="secondary" className="flex gap-1" onClick={handleBack}>
        <CaretLeft weight="bold" />
        <p>Back</p>
      </Button>

      <Textarea
        ref={textareaRef}
        className={`border-0 border-b rounded-none ${bricolageGrotesque.className} text-5xl mt-8 focus-visible:ring-0 font-semibold px-0 py-10`}
        placeholder="Title of the article"
        value={title}
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
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.name}>
                {category.name}
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
        <ContentForm
          content={editorContent}
          onChange={handleContentChange}
          onSubmit={handleCreate}
          isEditing={isEditing}
        />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>
            {isEditing ? "Update Article" : "Unsaved Changes"}
          </DialogTitle>
          <DialogDescription className="leading-normal">
            {actionType === "create"
              ? isEditing
                ? "Do you want to update this article?"
                : "You want to post this article or save as a draft?"
              : "You have unsaved changes. Do you want to save this as a draft or proceed without saving?"}
          </DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            {actionType === "create" && !isEditing && (
              <Button
                variant="outline"
                className="bg-yellow-500/10 text-yellow-600 border-yellow-500"
                onClick={handleSaveAsDraft}
              >
                Save as Draft
              </Button>
            )}

            <Link href="/admin/dashboard/articles">
              <Button variant="destructive">Discart</Button>
            </Link>

            <Button variant="default" onClick={handleDialogConfirm}>
              {actionType === "create"
                ? isEditing
                  ? "Save & Exit"
                  : "Post Article"
                : "Save Draft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleForm;
