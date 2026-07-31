import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "@/components/auth/session-provider";

export const metadata: Metadata = {
  title: "Bulk Mail Sender",
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
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}