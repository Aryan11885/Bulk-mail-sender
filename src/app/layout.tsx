import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/auth/session-provider";
import { Toaster } from "sonner";
import SessionGuard from "@/components/auth/session-guard";

export const metadata: Metadata = {
  title: "MailBlast OS",
  description: "Bulk Mail Sender using Gmail API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>

          <SessionGuard />

          {children}

          <Toaster richColors position="top-center" />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
