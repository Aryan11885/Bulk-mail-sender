"use client";

import { useSession } from "next-auth/react";
import SignInButton from "@/components/auth/sign-in-button";

import Header from "@/components/dashboard/header";
import EmailForm from "@/components/email/email-form";
import RecipientTable from "@/components/recipient/recipient-table";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <SignInButton />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <EmailForm />
          <RecipientTable />
        </div>
      </div>
    </main>
  );
}