"use client";

import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            📧 Bulk Mail Sender
          </h1>

          <p className="text-sm text-gray-500">
            Send personalized emails using Gmail
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {session?.user?.name}
            </p>

            <p className="text-sm text-gray-500">
              {session?.user?.email}
            </p>
          </div>

          <button
            onClick={() => signOut()}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}