"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function SessionGuard() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "AccessTokenExpired") {
      signOut({
        callbackUrl: "/",
      });
    }
  }, [session]);

  return null;
}