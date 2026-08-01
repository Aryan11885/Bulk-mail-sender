"use client";

import { useSession } from "next-auth/react";

import Header from "@/components/dashboard/header";

import { useEffect } from "react";
import { useEmailStore } from "@/store/email-store";

import EmailForm from "@/components/email/email-form";
import RecipientTable from "@/components/recipient/recipient-table";
import EmailPreview from "@/components/email/email-preview";
import SentHistory from "@/components/history/sent-history";

export default function Home() {
  const { data: session } = useSession();
  const { setHistory } = useEmailStore();

  useEffect(() => {
  const stored = localStorage.getItem("bulk-mail-history");

  if (stored) {
    setHistory(JSON.parse(stored));
  }
}, [setHistory]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      {!session ? (
        <div className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Bulk Mail Sender
          </h1>

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 shadow-sm">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">
              Welcome 👋
            </h2>

            <p className="text-gray-600">
              Sign in using the button in the top-right corner to start sending
              personalized Gmail emails.
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <EmailForm />
            <RecipientTable />
          </div>

          <div className="mt-6">
            <EmailPreview />
          </div>
          <SentHistory />
        </div>
      )}
    </main>
  );
}
