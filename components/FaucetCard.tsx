"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function FaucetCard() {
  const { address } = useAccount();
  const [claiming, setClaiming] = useState(false);
  const [lastClaim, setLastClaim] = useState<{ usdc: boolean; eurc: boolean } | null>(null);

  async function handleClaim() {
    if (!address) {
      toast.error("Connect your wallet first");
      return;
    }

    setClaiming(true);
    try {
      const res = await fetch("/api/faucet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, usdc: true, eurc: true }),
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message ?? "Faucet request failed");
        return;
      }

      setLastClaim({ usdc: true, eurc: true });
      toast.success("Testnet USDC & EURC on the way — check your balance shortly");
    } catch (err) {
      console.error("Faucet claim error:", err);
      toast.error("Faucet request failed");
    } finally {
      setClaiming(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl max-w-lg mx-auto">

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
              // Testnet Faucet
            </p>
            <h2 className="text-xl font-bold tracking-tight">Faucet</h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wide text-emerald-400 uppercase">
              Live
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed mb-5">
          Request free testnet USDC and EURC directly to your connected wallet
          on Arc Testnet. Powered by Circle's public faucet — no need to leave
          ARCora.
        </p>

        {address && (
          <div className="mb-5 bg-zinc-800/80 border border-white/5 rounded-2xl p-3.5 text-xs font-mono text-zinc-400 break-all">
            {address}
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={claiming || !address}
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
          disabled:opacity-50
          disabled:hover:scale-100
          duration-300
          shadow-[0_0_20px_rgba(168,85,247,0.25)]
          hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]
          "
        >
          <span className="relative z-10">
            {claiming
              ? "Requesting..."
              : !address
              ? "Connect wallet first"
              : "Request USDC + EURC"}
          </span>
        </button>

        {lastClaim && (
          <p className="text-[11px] text-zinc-600 font-mono text-center mt-3">
            Last request sent — Circle limits claims to roughly every 2 hours per address.
          </p>
        )}
      </div>
    </section>
  );
}