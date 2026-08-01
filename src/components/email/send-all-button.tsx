"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useEmailStore } from "@/store/email-store";

export default function SendAllButton() {
  const { subject, body, recipients } = useEmailStore();

  const [loading, setLoading] = useState(false);

  const sendAll = async () => {
    if (recipients.length === 0) {
      toast.error("Please add at least one recipient.");
      return;
    }

    if (!subject.trim()) {
      toast.error("Please enter an email subject.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/gmail/send-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subject,
          body,
          recipients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }

      toast.success(
        `✅ Sent: ${data.sent} | Failed: ${data.failed}`
      );

      console.table(data.results);
    } catch (error) {
      console.error(error);

      toast.error("Bulk email sending failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={sendAll}
      disabled={loading}
      className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? "Sending..." : "🚀 Send to All"}
    </button>
  );
}