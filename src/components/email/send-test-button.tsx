"use client";

import { useState } from "react";
import { useEmailStore } from "@/store/email-store";
import { toast } from "sonner";

export default function SendTestButton() {
  const { subject, body } = useEmailStore();

  const [loading, setLoading] = useState(false);

  const sendTestEmail = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/gmail/send-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          to: "creyotech10@gmail.com",
          subject: subject || "Test Email",
          html: body.replace("{{name}}", "Creyotech"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      toast.success("✅ Test email sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send test email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={sendTestEmail}
      disabled={loading}
      className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? "Sending..." : "📨 Send Test Email"}
    </button>
  );
}