"use client";

import { CheckCircle2, XCircle, Send, Loader2 } from "lucide-react";

interface Result {
  name: string;
  email: string;
  status: "success" | "failed";
}

interface ProgressDialogProps {
  open: boolean;
  completed: boolean;
  progress: number;
  total: number;
  currentEmail: string;
  results: Result[];
  onClose: () => void;
}

export default function ProgressDialog({
  open,
  completed,
  progress,
  total,
  currentEmail,
  results,
  onClose,
}: ProgressDialogProps) {
  if (!open) return null;

  const percentage = total === 0 ? 0 : Math.round((progress / total) * 100);
  const sent = results.filter((r) => r.status === "success").length;
  const failed = results.filter((r) => r.status === "failed").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl flex flex-col">

        {!completed ? (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
                <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Sending campaign...</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {progress} of {total} emails sent
                </p>
              </div>
            </div>

            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500 mb-6">
              <span>{progress} / {total}</span>
              <span>{percentage}%</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-500 mb-1">Currently sending to</p>
              <p className="text-sm font-medium text-white break-all">
                {currentEmail || "Preparing..."}
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
              Keep this window open while your campaign is sending
            </p>
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 shrink-0">
                  <Send className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Campaign complete</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Here's a summary of your send</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <p className="text-xs text-slate-500 mb-1">Total</p>
                  <p className="text-2xl font-bold text-white">{total}</p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
                  <p className="text-xs text-emerald-500 mb-1">Sent</p>
                  <p className="text-2xl font-bold text-emerald-400">{sent}</p>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center">
                  <p className="text-xs text-red-500 mb-1">Failed</p>
                  <p className="text-2xl font-bold text-red-400">{failed}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-2 space-y-2 min-h-0">
              {results.map((result) => (
                <div
                  key={result.email}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {result.name || "—"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{result.email}</p>
                  </div>

                  {result.status === "success" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 shrink-0">
                      <CheckCircle2 className="h-3 w-3" />
                      Sent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 shrink-0">
                      <XCircle className="h-3 w-3" />
                      Failed
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}