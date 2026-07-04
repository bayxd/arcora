"use client";

import Link from "next/link";
import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/Footer";
import { useAppKit } from "@reown/appkit/react";

export default function Page() {
  const appKit = useAppKit();

  return (
    <main className="min-h-screen text-white">

      <ConnectWallet />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden px-6">

        {/* grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(168,85,247,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.35) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 42%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 42%, black 30%, transparent 100%)",
          }}
        />

        {/* glow background */}
        <div className="absolute w-125 h-125 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute w-87.5 h-87.5 bg-pink-500/20 blur-[100px] rounded-full animate-ping" />

        {/* eyebrow status tag */}
        <div className="relative z-10 mb-7 flex items-center gap-2 rounded-full border border-purple-500/30 bg-zinc-900/60 backdrop-blur px-4 py-1.5 shadow-[0_0_16px_rgba(168,85,247,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Arc Testnet · Network Online
          </span>
        </div>

        {/* orb centerpiece with HUD rings */}
        <div className="relative z-10 w-56 h-56 flex items-center justify-center mb-10">

          {/* outer dashed ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-purple-500/30 animate-spin"
            style={{ animationDuration: "22s" }}
          />

          {/* mid ring, reverse direction */}
          <div
            className="absolute inset-6 rounded-full border border-blue-500/20 animate-spin"
            style={{ animationDuration: "14s", animationDirection: "reverse" }}
          />

          {/* HUD corner brackets */}
          <div className="pointer-events-none absolute -top-1 -left-1 h-4 w-4 border-t border-l border-purple-400/60" />
          <div className="pointer-events-none absolute -top-1 -right-1 h-4 w-4 border-t border-r border-blue-400/60" />
          <div className="pointer-events-none absolute -bottom-1 -left-1 h-4 w-4 border-b border-l border-purple-400/30" />
          <div className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 border-b border-r border-blue-400/30" />

          {/* orbiting token nodes */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "9s" }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "13s", animationDirection: "reverse" }}
          >
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6]" />
          </div>

          {/* core orb */}
          <div className="relative w-32 h-32 rounded-full bg-linear-to-tr from-purple-500 via-pink-500 to-blue-500 animate-spin-slow shadow-2xl" />
        </div>

        {/* headline */}
        <h1 className="relative z-10 text-center text-4xl sm:text-6xl font-black tracking-tight mb-4 leading-tight">
          <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Money Moves Instantly.
          </span>
          <br />
          <span className="text-white">Agents Work Trustlessly.</span>
        </h1>

        <p className="relative z-10 text-zinc-400 text-center max-w-md mb-8 text-sm">
          Cross-chain swaps, bridging, and Genesis Pass minting - powered by Circle on Arc Testnet.
        </p>

        {/* CTA buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/swap"
            className="
            h-12
            px-6
            rounded-xl
            text-sm
            font-bold
            uppercase
            tracking-wide
            bg-linear-to-r
            from-purple-600
            via-pink-500
            to-blue-500
            shadow-[0_0_20px_rgba(168,85,247,0.25)]
            hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]
            hover:scale-[1.02]
            duration-300
            flex
            items-center
            "
          >
            Launch App
          </Link>

          <Link
            href="/genesis"
            className="
            h-12
            px-6
            rounded-xl
            text-sm
            font-semibold
            border
            border-white/10
            bg-zinc-900/60
            backdrop-blur
            hover:border-purple-500/30
            hover:bg-zinc-800
            duration-300
            flex
            items-center
            "
          >
            Mint Genesis Pass
          </Link>
        </div>

        {/* status ticker */}
        <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500">
          <div>
            <span className="text-purple-400 font-semibold">USDC</span>
            <span className="mx-1.5 text-zinc-700">·</span>
            <span className="text-zinc-400">EURC</span>
          </div>
          <div className="h-3 w-px bg-white/10 hidden sm:block" />
          <div>
            Chain: <span className="text-blue-400">Arc-Testnet</span>
          </div>
          <div className="h-3 w-px bg-white/10 hidden sm:block" />
          <div>
            Gas: <span className="text-emerald-400">Sponsored</span>
          </div>
        </div>

      </section>

      <Footer />

    </main>
  );
}