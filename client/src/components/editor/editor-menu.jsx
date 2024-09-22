import { EditorBubble, useEditor } from "novel";
import { removeAIHighlight } from "novel/extensions";

import { useEffect } from "react";

export default function EditorMenu({ children, open, onOpenChange }) {
  const { editor } = useEditor();

  useEffect(() => {
    if (!editor) return;
    if (!open) removeAIHighlight(editor);
  }, [open]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor?.chain().unsetHighlight().run();
        },
      }}
      className="flex items-center w-fit max-w-[90vw] overflow-hidden rounded-xl border bg-neutral-50 shadow-lg"
    >
      {!open && children}
    </EditorBubble>
  );
}
