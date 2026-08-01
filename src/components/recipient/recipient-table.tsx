"use client";

import { useEffect } from "react";
import { Users, Plus, X } from "lucide-react";
import type { Recipient } from "@/types/recipient";
import CsvUpload from "./csv-upload";
import { useEmailStore } from "@/store/email-store";

export default function RecipientTable() {
  const { recipients, setRecipients } = useEmailStore();

  useEffect(() => {
    if (recipients.length === 0) {
      setRecipients([{ id: crypto.randomUUID(), name: "", email: "" }]);
    }
  }, [recipients.length, setRecipients]);

  const addRow = () => {
    setRecipients([...recipients, { id: crypto.randomUUID(), name: "", email: "" }]);
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(
      recipients.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const removeRecipient = (id: string) => {
    if (recipients.length === 1) return;
    setRecipients(recipients.filter((r) => r.id !== id));
  };

  const importRecipients = (items: Recipient[]) => {
    setRecipients(items);
  };

  const INPUT_CLASS =
    "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Audience</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {recipients.length} {recipients.length === 1 ? "recipient" : "recipients"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CsvUpload onImport={importRecipients} />

          <button
            onClick={addRow}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
          >
            <Plus className="h-3.5 w-3.5" />
            Add row
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="grid grid-cols-12 gap-2 px-1">
          <p className="col-span-5 text-xs font-medium uppercase tracking-wide text-slate-500">Name</p>
          <p className="col-span-6 text-xs font-medium uppercase tracking-wide text-slate-500">Email</p>
        </div>

        {recipients.map((recipient) => (
          <div key={recipient.id} className="grid grid-cols-12 gap-2">
            <input
              className="col-span-5 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Jane Doe"
              value={recipient.name}
              onChange={(e) => updateRecipient(recipient.id, "name", e.target.value)}
            />

            <input
              className="col-span-6 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="jane@company.com"
              value={recipient.email}
              onChange={(e) => updateRecipient(recipient.id, "email", e.target.value)}
            />

            <button
              onClick={() => removeRecipient(recipient.id)}
              disabled={recipients.length === 1}
              aria-label="Remove recipient"
              className="col-span-1 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}