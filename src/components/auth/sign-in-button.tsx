"use client";

import { signIn } from "next-auth/react";
import { Globe } from "lucide-react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <Globe className="h-4 w-4" />
      Continue with Google
    </button>
  );
}