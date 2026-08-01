"use client";

import { useEmailStore } from "@/store/email-store";
import { History } from "lucide-react";

export default function SentHistory() {
  const { history } = useEmailStore();

  if (history.length === 0) {
    return (
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="text-xl font-bold">Sent History</h2>
        </div>

        <p className="mt-4 text-gray-500">
          No emails have been sent yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center gap-2">
        <History className="h-5 w-5" />
        <h2 className="text-xl font-bold">
          Sent History
        </h2>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {item.subject}
              </h3>

              <span className="text-sm text-gray-500">
                {new Date(item.sentAt).toLocaleString()}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              Sent: {item.sent} | Failed: {item.failed}
            </div>

            <div className="mt-2 text-sm text-gray-500">
              {item.recipients.length} Recipients
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}