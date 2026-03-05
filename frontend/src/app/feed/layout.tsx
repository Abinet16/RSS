"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { FeedProvider } from "@/contexts/FeedContext";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <FeedProvider>
        {children}
      </FeedProvider>
    </AuthProvider>
  );
}
