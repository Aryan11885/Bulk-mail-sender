"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useEmailStore } from "@/store/email-store";
import ProgressDialog from "@/components/ui/progress-dialog";

type SendResult = {
  name: string;
  email: string;
  status: "success" | "failed";
};

export default function SendAllButton() {
  const {
    subject,
    body,
    recipients,
    reset,
    history,
    addHistory,
  } = useEmailStore();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentEmail, setCurrentEmail] = useState("");

  const [results, setResults] = useState<SendResult[]>([]);

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
    setOpen(true);
    setCompleted(false);
    setProgress(0);
    setCurrentEmail("");
    setResults([]);

    let sent = 0;
    let failed = 0;

    const emailResults: SendResult[] = [];

    try {
      for (let i = 0; i < recipients.length; i++) {
        const recipient = recipients[i];

        setCurrentEmail(recipient.email);

        try {
          const response = await fetch("/api/gmail/send-one", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: recipient.email,
              subject,
              html: body.replaceAll(
                "{{name}}",
                recipient.name || "Friend"
              ),
            }),
          });

          if (!response.ok) {
            throw new Error();
          }

          sent++;

          emailResults.push({
            name: recipient.name,
            email: recipient.email,
            status: "success",
          });
        } catch {
          failed++;

          emailResults.push({
            name: recipient.name,
            email: recipient.email,
            status: "failed",
          });
        }

        setResults([...emailResults]);
        setProgress(i + 1);

        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      setCompleted(true);

      const historyItem = {
        id: crypto.randomUUID(),
        subject,
        sentAt: new Date().toISOString(),
        sent,
        failed,
        recipients,
      };

      // Update Zustand immediately
      addHistory(historyItem);

      // Persist to localStorage
      localStorage.setItem(
        "bulk-mail-history",
        JSON.stringify([historyItem, ...history])
      );

      toast.success(`Completed! Sent: ${sent} | Failed: ${failed}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while sending emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProgressDialog
        open={open}
        completed={completed}
        progress={progress}
        total={recipients.length}
        currentEmail={currentEmail}
        results={results}
        onClose={() => {
          reset();

          setOpen(false);
          setCompleted(false);
          setProgress(0);
          setCurrentEmail("");
          setResults([]);
        }}
      />

      <button
        onClick={sendAll}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending..." : "🚀 Send to All"}
      </button>
    </>
  );
}