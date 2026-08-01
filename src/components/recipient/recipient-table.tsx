"use client";

import { useEffect } from "react";
import type { Recipient } from "@/types/recipient";
import CsvUpload from "./csv-upload";
import { useEmailStore } from "@/store/email-store";

export default function RecipientTable() {
  const { recipients, setRecipients } = useEmailStore();

  useEffect(() => {
    if (recipients.length === 0) {
      setRecipients([
        {
          id: crypto.randomUUID(),
          name: "",
          email: "",
        },
      ]);
    }
  }, [recipients.length, setRecipients]);

  const addRow = () => {
    setRecipients([
      ...recipients,
      {
        id: crypto.randomUUID(),
        name: "",
        email: "",
      },
    ]);
  };

  const updateRecipient = (
    id: string,
    field: keyof Recipient,
    value: string
  ) => {
    setRecipients(
      recipients.map((recipient) =>
        recipient.id === id
          ? { ...recipient, [field]: value }
          : recipient
      )
    );
  };

  const removeRecipient = (id: string) => {
    if (recipients.length === 1) return;

    setRecipients(
      recipients.filter((recipient) => recipient.id !== id)
    );
  };

  const importRecipients = (items: Recipient[]) => {
    setRecipients(items);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Recipients</h2>

        <div className="flex items-center gap-3">
          <CsvUpload onImport={importRecipients} />

          <button
            onClick={addRow}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            + Add Row
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {recipients.map((recipient) => (
          <div
            key={recipient.id}
            className="grid grid-cols-12 gap-3"
          >
            <input
              className="col-span-5 rounded-lg border p-3"
              placeholder="Recipient Name"
              value={recipient.name}
              onChange={(e) =>
                updateRecipient(
                  recipient.id,
                  "name",
                  e.target.value
                )
              }
            />

            <input
              className="col-span-6 rounded-lg border p-3"
              placeholder="Recipient Email"
              value={recipient.email}
              onChange={(e) =>
                updateRecipient(
                  recipient.id,
                  "email",
                  e.target.value
                )
              }
            />

            <button
              onClick={() => removeRecipient(recipient.id)}
              className="rounded-lg bg-red-500 px-3 text-white transition hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}