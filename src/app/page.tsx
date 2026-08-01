"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Mail } from "lucide-react";

import Header from "@/components/dashboard/header";
import { useEmailStore } from "@/store/email-store";
import EmailForm from "@/components/email/email-form";
import RecipientTable from "@/components/recipient/recipient-table";
import EmailPreview from "@/components/email/email-preview";
import SentHistory from "@/components/history/sent-history";
import SignInButton from "@/components/auth/sign-in-button";

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
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      {!session ? (
        <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/20">
            <Mail className="h-8 w-8 text-indigo-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            MailBlast OS
          </h1>

          <p className="mt-3 text-base text-slate-400 max-w-md">
            Send personalized Gmail campaigns to your entire audience in minutes.
          </p>

          <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-lg font-semibold text-white mb-2">
              Get started
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Sign in with Google to compose, personalize, and send bulk email campaigns.
            </p>
            <SignInButton />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
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