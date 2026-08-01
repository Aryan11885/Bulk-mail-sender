"use client";

import { History, CheckCircle2, XCircle, Users } from "lucide-react";
import { useEmailStore } from "@/store/email-store";

export default function SentHistory() {
  const { history } = useEmailStore();

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
          <History className="h-4 w-4 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Campaign History</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {history.length === 0
              ? "No campaigns sent yet"
              : `${history.length} campaign${history.length === 1 ? "" : "s"} sent`}
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-10 text-center">
          <History className="h-8 w-8 text-slate-600 mb-3" />
          <p className="text-sm text-slate-400">Send your first campaign to see results here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-slate-900/50 p-4 transition-colors hover:border-white/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-sm font-medium text-white truncate">
                  {item.subject}
                </h3>
                <span className="text-xs text-slate-500 shrink-0">
                  {new Date(item.sentAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400">
                  <Users className="h-3 w-3" />
                  {item.recipients.length} recipients
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  {item.sent} sent
                </span>

                {item.failed > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                    <XCircle className="h-3 w-3" />
                    {item.failed} failed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}