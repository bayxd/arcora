"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter } from "@/lib/reown";
import { AccessProvider } from "@/context/AccessContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AccessProvider>
          {children}
        </AccessProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}