"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
    ],
    content: `
      <p>Dear {{name}},</p>

      <p>Welcome to Creyotech 🚀</p>

      <p>Regards,<br/>HR Team</p>
    `,
  });

  if (!editor) return null;

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded border px-3 py-1"
        >
          <b>B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded border px-3 py-1 italic"
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="rounded border px-3 py-1 underline"
        >
          U
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="rounded border px-3 py-1"
        >
          • List
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="rounded border px-3 py-1"
        >
          1. List
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4"
      />
    </div>
  );
}