"use client";

import Papa from "papaparse";
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
        const data = result.data as {
          Name: string;
          Email: string;
        }[];

        const recipients: Recipient[] = data.map((row) => ({
          id: crypto.randomUUID(),
          name: row.Name ?? "",
          email: row.Email ?? "",
        }));

        onImport(recipients);
      },
    });
  };

  return (
    <input
      type="file"
      accept=".csv"
      onChange={handleFile}
    />
  );
}