"use client";

import { createContext, useContext, ReactNode } from "react";
import { useGenesisPass } from "@/hooks/useGenesisPass";


type AccessContextType = {
  isHolder: boolean;
  isLoading: boolean;
};

const AccessContext = createContext<AccessContextType>({
  isHolder: false,
  isLoading: true
});

export function AccessProvider({ children }: { children: ReactNode }) {
  const { isHolder, isLoading } = useGenesisPass();

  return (
    <AccessContext.Provider value={{ isHolder, isLoading }}>
      {children}
    </AccessContext.Provider>
  );
}

export const useAccess = () => useContext(AccessContext);
