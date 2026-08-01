"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, Mail } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-600 shrink-0">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              MailBlast OS
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Send personalized emails at scale
            </p>
          </div>
        </div>

        {session ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white leading-tight">
                {session.user?.name}
              </p>
              <p className="text-xs text-slate-400 truncate max-w-[180px]">
                {session.user?.email}
              </p>
            </div>

            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "Profile"}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-white/10 shrink-0"
              />
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs sm:text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Continue with Google
          </button>
        )}
      </div>
    </header>
  );
}