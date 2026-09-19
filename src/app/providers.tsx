"use client";

import { ReactNode } from "react";

import QueryProvider from "@/provider/QueryProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}