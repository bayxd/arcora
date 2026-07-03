"use client";

import { ReactNode } from "react";

export default function AppKitProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}