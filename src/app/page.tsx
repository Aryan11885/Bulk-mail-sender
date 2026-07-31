"use client";

import { useSession } from "next-auth/react";
import SignInButton from "@/components/auth/sign-in-button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      {!session ? (
        <SignInButton />
      ) : (
        <div className="rounded-xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-2xl font-bold">
            Welcome
          </h1>

          <p className="mt-4">
            {session.user?.name}
          </p>

          <p className="text-gray-500">
            {session.user?.email}
          </p>
        </div>
      )}
    </main>
  );
}