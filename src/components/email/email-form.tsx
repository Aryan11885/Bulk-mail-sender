"use client";

import RichTextEditor from "./rich-text-editor";
import { useEmailStore } from "@/store/email-store";
import SendAllButton from "./send-all-button";
import { Mail } from "lucide-react";

export default function EmailForm() {
  const { subject, setSubject } = useEmailStore();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
          <Mail className="h-4 w-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Compose Email</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Use <code className="rounded bg-white/10 px-1 py-0.5 text-indigo-300 text-xs">{"{{name}}"}</code> to personalize for each recipient
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Subject
          </label>
          <input
            type="text"
            placeholder="e.g. Exclusive offer just for you, {{name}}"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Email body
          </label>
          <RichTextEditor />
        </div>

        <div className="flex justify-end pt-1">
          <SendAllButton />
        </div>
      </div>
    </div>
  );
}