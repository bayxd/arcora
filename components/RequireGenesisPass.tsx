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
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-25 text-white text-center">
        Connect wallet
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-25 text-white text-center">
        Checking access...
      </div>
    );
  }

  if (!isHolder) {
    return (
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-25 flex flex-col items-center justify-center text-center text-white">
        <div className="bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-4xl p-12 shadow-2xl max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-6">🔒 Feature Locked</h1>

          <p className="text-zinc-400 mb-8">
            Mint a Genesis Pass to unlock this feature.
          </p>

          <button
            onClick={handleMint}
            disabled={minting}
            className="w-full py-4 rounded-full text-lg font-bold bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 hover:scale-[1.02] duration-300 disabled:opacity-50"
          >
            {minting ? "Minting..." : "Mint Genesis Pass"}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
