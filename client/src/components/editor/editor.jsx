"use client";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from "novel";
import { useState } from "react";

import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";

import EditorMenu from "@/components/editor/editor-menu";
import { defaultExtensions } from "@/components/editor/extensions";
import { uploadFn } from "@/components/editor/image-upload";
import { ColorSelector } from "@/components/editor/selectors/color-selector";
import { LinkSelector } from "@/components/editor/selectors/link-selector";
import { MathSelector } from "@/components/editor/selectors/math-selector";
import { NodeSelector } from "@/components/editor/selectors/node-selector";
import { TextButtons } from "@/components/editor/selectors/text-buttons";
import {
  slashCommand,
  suggestionItems,
} from "@/components/editor/slash-command";

import { Separator } from "@/components/ui/separator";
import DOMPurify from "dompurify";
import { DOMParser as ProseMirrorDOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { toast } from "sonner";

const extensions = [...defaultExtensions, slashCommand];

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

const convertHtmlToProseMirror = (html) => {
  if (!html) {
    return defaultEditorContent;
  }

  try {
    const sanitizedHtml = DOMPurify.sanitize(html);
    const domParser = new window.DOMParser();
    const tempElement = domParser.parseFromString(sanitizedHtml, "text/html");

    if (!tempElement.body.textContent.trim()) {
      return defaultEditorContent;
    }

    const doc = ProseMirrorDOMParser.fromSchema(schema).parse(tempElement.body);
    return doc.toJSON();
  } catch (error) {
    console.error("Error converting HTML to ProseMirror:", error);
    return defaultEditorContent;
  }
};

export default function Editor({ initialValue, onChange }) {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const getInitialContent = () => {
    if (!initialValue) return defaultEditorContent;

    if (typeof initialValue === "object" && initialValue.type === "doc") {
      return initialValue;
    }

    if (typeof initialValue === "string") {
      try {
        const initialProseMirrorContent =
          convertHtmlToProseMirror(initialValue);
        return initialProseMirrorContent;
      } catch (error) {
        toast.error("Error parsing initial content!");
        return initialProseMirrorContent;
      }
    }

    return initialProseMirrorContent;
  };

  const highlightCodeblocks = (content) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const codeBlocks = doc.querySelectorAll("pre code");
    codeBlocks.forEach((el) => {
      hljs.highlightElement(el);
    });

    return new XMLSerializer().serializeToString(doc);
  };

  const safeHandleImageDrop = (view, event, moved) => {
    const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });

    if (!pos || pos.pos < 0 || pos.pos > view.state.doc.content.size) {
      console.error("Position out of range.");
      return false;
    }

    return handleImageDrop(view, event, moved, uploadFn);
  };

  const safeHandleImagePaste = (view, event) => {
    const pos = view.state.selection.$from.pos;

    if (pos < 0 || pos > view.state.doc.content.size) {
      console.error("Position out of range.");
      return false;
    }

    return handleImagePaste(view, event, uploadFn);
  };

  return (
    <div className="relative w-full max-w-screen-lg">
      <EditorRoot>
        <EditorContent
          immediatelyRender={true}
          initialContent={getInitialContent()}
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => safeHandleImagePaste(view, event),
            handleDrop: (view, event, _slice, moved) =>
              safeHandleImageDrop(view, event, moved),
            attributes: {
              class:
                "prose dark:prose-invert font-default focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            const content = editor.getHTML();
            const highlightedContent = highlightCodeblocks(content);
            onChange(highlightedContent);
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-xl border bg-neutral-50 px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorMenu open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />

            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />

            <Separator orientation="vertical" />
            <MathSelector />

            <Separator orientation="vertical" />
            <TextButtons />

            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorMenu>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
