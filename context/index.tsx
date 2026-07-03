"use client";

import { ReactNode } from "react";
import { AccessProvider } from "./AccessContext";

export default function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AccessProvider>{children}</AccessProvider>;
}