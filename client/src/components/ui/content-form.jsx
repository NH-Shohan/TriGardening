"use client";

import Editor from "@/components/editor/editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

export default function ContentForm({ onSubmit }) {
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    setPending(true);

    const result = { success: true };

    if (!result.success) {
      toast.error("Error occurred.");
    } else {
      toast.success("Article created successfully!");
      onSubmit(content);
    }

    setPending(false);
  }

  return (
    <div className="mt-6 flex max-w-2xl mx-auto flex-col gap-4">
      <Editor initialValue={defaultValue} onChange={setContent} />
      <Button onClick={handleSubmit} disabled={pending}>
        {pending ? "Submitting..." : "Create"}
      </Button>
    </div>
  );
}
