"use client";

import { useAccount } from "wagmi";
import { useAccess } from "@/context/AccessContext";
import { useState } from "react";
import { toast } from "sonner";

export default function RequireGenesisPass({
  children
}: {
  children: React.ReactNode;
}) {
  const { address } = useAccount();
  const { isHolder, isLoading } = useAccess();
  const [minting, setMinting] = useState(false);

  async function handleMint() {
    if (!address) return;

    setMinting(true);

    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient: address })
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message ?? "Mint failed");
        return;
      }

      toast.success("Mint submitted, processing...");

      for (let i = 0; i < 15; i++) {
        await new Promise((r) => setTimeout(r, 3000));

        const statusRes = await fetch(
          `/api/mint/status?id=${data.transactionId}`
        );
        const statusData = await statusRes.json();

        if (statusData.state === "COMPLETE") {
          toast.success("Genesis Pass minted!");
          window.location.reload();
          return;
        }

        if (
          ["FAILED", "CANCELLED", "DENIED"].includes(statusData.state)
        ) {
          toast.error("Mint failed on-chain");
          return;
        }
      }

      toast.error("Mint is taking longer than expected, check back later");
    } catch (err) {
      console.error("Mint error:", err);
      toast.error("Mint failed");
    } finally {
      setMinting(false);
    }
  }

  if (!address) {
    return (
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-25 text-white text-center text-sm font-mono text-zinc-500">
        Connect wallet
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-25 text-white text-center text-sm font-mono text-zinc-500">
        Checking access...
      </div>
    );
  }

  if (!isHolder) {
    return (
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-60 flex flex-col items-center justify-center text-center text-white">
        <div className="relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 shadow-2xl max-w-lg w-full">

          {/* neon top strip */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

          {/* HUD corner brackets */}
          <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
          <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

          <div className="relative">

            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-2">
              // Access Denied
            </p>

            <h1 className="text-2xl font-bold mb-4">🔒 Feature Locked</h1>

            <p className="text-zinc-400 text-sm mb-6">
              Mint a Genesis Pass to unlock this feature.
            </p>

            <button
              onClick={handleMint}
              disabled={minting}
              className="
              group
              relative
              w-full
              h-12
              rounded-xl
              text-sm
              font-bold
              tracking-wide
              uppercase
              overflow-hidden
              bg-linear-to-r
              from-purple-600
              via-pink-500
              to-blue-500
              hover:scale-[1.01]
              active:scale-[0.99]
              disabled:opacity-60
              disabled:hover:scale-100
              duration-300
              shadow-[0_0_20px_rgba(168,85,247,0.25)]
              hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]
              "
            >
              <span className="relative z-10">
                {minting ? "Minting..." : "Mint Genesis Pass"}
              </span>
            </button>

          </div>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}