"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Toaster position="top-right" />
        {children}
      </SessionProvider>
      <Toaster />
    </>
  );
}
