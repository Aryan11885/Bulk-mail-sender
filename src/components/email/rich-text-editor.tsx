"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEmailStore } from "@/store/email-store";
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered } from "lucide-react";

const TOOLBAR_BTN =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50";

const TOOLBAR_BTN_ACTIVE =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/15 text-indigo-300 focus:outline-none";

export default function RichTextEditor() {
  const { body, setBody } = useEmailStore();

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: body,
    onUpdate({ editor }) {
      setBody(editor.getHTML());
    },
  });

  if (!editor) return null;

  const tools = [
    {
      icon: Bold,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: UnderlineIcon,
      label: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      icon: List,
      label: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      label: "Ordered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2.5">
        {tools.map(({ icon: Icon, label, action, active }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            aria-label={label}
            className={active ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}

        <div className="ml-auto">
          <span className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-mono text-indigo-300">
            {"{{name}}"}
          </span>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}