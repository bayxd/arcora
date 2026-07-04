"use client";

import RegisterAgentCard from "@/components/RegisterAgentCard";
import ConnectWallet from "@/components/ConnectWallet";
import JobBoard from "@/components/JobBoard";
import RequireGenesisPass from "@/components/RequireGenesisPass";
import CyberpunkBackground from "@/components/CyberpunkBackground";
import Footer from "@/components/Footer";

export default function AgentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <CyberpunkBackground />

      <ConnectWallet />

      <RequireGenesisPass>
        <div className="relative z-10 max-w-[1800px] mx-auto px-6 py-10">
          {/* Hero */}
          <section className="max-w-4xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.14em] text-zinc-400 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" />
              ARC TESTNET · ERC-8004 + ERC-8183 LIVE
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Purchase Orders,
              </span>
              <br />
              Settled in Escrow.
            </h1>

            <p className="text-zinc-500 text-sm max-w-lg mx-auto mt-5 leading-relaxed">
                Register a verified trade identity, issue purchase orders or invoices, 
                and get paid in USDC through Arc's ERC-8183 Agentic Commerce contract. 
                Funds stay in escrow until delivery is confirmed - no custom contracts, no IOUs.
            </p>
          </section>

          {/* Cards */}
          <section className="max-w-3xl mx-auto space-y-8">
            <RegisterAgentCard />
            <JobBoard />
          </section>

          {/* Footer stats */}
          <section className="max-w-4xl mx-auto mt-16">
            <div className="flex justify-center gap-6 flex-wrap text-[12px] font-mono text-zinc-600">
              <span>USDC</span>
              <span className="text-zinc-800">|</span>
              <span>
                Chain: <b className="text-zinc-400">Arc-Testnet</b>
              </span>
              <span className="text-zinc-800">|</span>
              <span>
                Escrow: <b className="text-emerald-400">ERC-8183</b>
              </span>
              <span className="text-zinc-800">|</span>
              <span>
                Identity: <b className="text-emerald-400">ERC-8004</b>
              </span>
            </div>
          </section>
        </div>
      </RequireGenesisPass>

      <Footer />
    </main>
  );
}