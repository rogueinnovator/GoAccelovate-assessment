"use client";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
export default function UserPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionProvider>
        <Navbar />
        <main>{children}</main>
      </SessionProvider>
    </div>
  );
}
