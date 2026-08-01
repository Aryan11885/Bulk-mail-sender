"use client";

import { Eye } from "lucide-react";
import { useEmailStore } from "@/store/email-store";

export default function EmailPreview() {
  const { subject, body, recipients } = useEmailStore();

  if (recipients.length === 0 || recipients.every((r) => !r.email)) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
            <Eye className="h-4 w-4 text-indigo-400" />
          </div>
          <h2 className="text-sm font-semibold text-white">Email Preview</h2>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-10 text-center">
          <Eye className="h-8 w-8 text-slate-600 mb-3" />
          <p className="text-sm text-slate-400">
            Add recipients to preview how your email will look
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
          <Eye className="h-4 w-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Email Preview</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {recipients.length} personalized {recipients.length === 1 ? "preview" : "previews"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recipients.map((recipient) => (
          <div
            key={recipient.id}
            className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden"
          >
            <div className="border-b border-white/10 bg-white/5 px-4 py-3 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 w-10 shrink-0">To</span>
                <span className="text-slate-200 font-medium">{recipient.email || "—"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 w-10 shrink-0">Subject</span>
                <span className="text-slate-200 font-medium">
                  {subject
                    ? subject.replaceAll("{{name}}", recipient.name || "Friend")
                    : <span className="text-slate-500 italic">No subject</span>}
                </span>
              </div>
            </div>

            <div
              className="px-4 py-4 text-sm text-slate-200 prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: body.replaceAll("{{name}}", recipient.name || "Friend"),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}