"use client";

import Papa from "papaparse";
import { Upload } from "lucide-react";
import type { Recipient } from "@/types/recipient";

interface Props {
  onImport: (recipients: Recipient[]) => void;
}

export default function CsvUpload({ onImport }: Props) {
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete(result) {
        const data = result.data as { Name: string; Email: string }[];

        const recipients: Recipient[] = data.map((row) => ({
          id: crypto.randomUUID(),
          name: row.Name ?? "",
          email: row.Email ?? "",
        }));

        onImport(recipients);
      },
    });

    event.target.value = "";
  };

  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-within:ring-2 focus-within:ring-indigo-500/50">
      <Upload className="h-3.5 w-3.5" />
      Import CSV
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="sr-only"
      />
    </label>
  );
}