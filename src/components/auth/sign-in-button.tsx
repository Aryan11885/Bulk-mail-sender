"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
    >
      Continue with Google
    </button>
  );
}