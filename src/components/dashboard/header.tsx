"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, Mail } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
            <Mail className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Bulk Mail Sender
            </h1>

            <p className="text-xs text-gray-500">
              Send personalized emails using Gmail
            </p>
          </div>
        </div>

        {/* Right */}
        {session ? (
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "Profile"}
                className="h-10 w-10 rounded-full border"
              />
            )}

            <div className="text-right">
              <p className="font-medium text-gray-900">
                {session.user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {session.user?.email}
              </p>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700"
          >
            Continue with Google
          </button>
        )}
      </div>
    </header>
  );
}