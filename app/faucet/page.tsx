"use client";

import FaucetCard from "@/components/FaucetCard";
import ConnectWallet from "@/components/ConnectWallet";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import Footer from "@/components/dashboard/Footer";

export default function FaucetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <CyberpunkBackground />

      <ConnectWallet />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 py-10">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.14em] text-zinc-400 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
            ARC TESTNET · FAUCET LIVE
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Get Testnet Funds.
            </span>
            <br />
            No Tab-Switching Required.
          </h1>

          <p className="text-zinc-500 text-sm max-w-lg mx-auto mt-5 leading-relaxed">
            Request free USDC and EURC on Arc Testnet directly to your
            connected wallet, powered by Circle's public faucet.
          </p>
        </section>

        {/* Faucet card */}
        <section className="max-w-3xl mx-auto">
          <FaucetCard />
        </section>
      </div>

      <Footer />
    </main>
  );
}