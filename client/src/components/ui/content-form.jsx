"use client";

import Editor from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify"; // Optional for sanitizing HTML
import { DOMParser as ProseMirrorDOMParser } from "prosemirror-model";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

export default function ContentForm({
  onSubmit,
  content: parentContent,
  onChange,
  isEditing,
  editorSchema, // ProseMirror schema should be passed as prop
}) {
  const [localContent, setLocalContent] = useState(
    parentContent || defaultValue
  );

  const handleContentChange = (newContent) => {
    setLocalContent(newContent);
    onChange(newContent);
  };

  useEffect(() => {
    if (parentContent && editorSchema) {
      try {
        const sanitizedHtml = DOMPurify.sanitize(parentContent);
        const domParser = new DOMParser();
        const parsedHtml = domParser.parseFromString(
          sanitizedHtml,
          "text/html"
        );

        const structuredContent = ProseMirrorDOMParser.fromSchema(
          editorSchema
        ).parse(parsedHtml.body);

        setLocalContent(structuredContent.toJSON());
      } catch (error) {
        toast.error("Error converting HTML to editor format");
      }
    }
  }, [parentContent, editorSchema]);

  return (
    <div className="mt-6 flex max-w-2xl mx-auto flex-col gap-4">
      <Editor initialValue={localContent} onChange={handleContentChange} />
      <Button onClick={() => onSubmit()}>
        {isEditing ? "Update" : "Create"}
      </Button>
    </div>
  );
}
