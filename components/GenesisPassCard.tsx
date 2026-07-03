"use client";

import Image from "next/image";

const BADGE_IMAGE =
  "https://gateway.pinata.cloud/ipfs/bafybeidn35bgjvbbss7vwcu6hfwibumgvkd46uonkiq53eqwbs4hmcdo24";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GENESIS_PASS_CONTRACT;

export default function GenesisPassCard() {
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
              // Genesis Registry
            </p>
            <h2 className="text-xl font-bold tracking-tight">My Genesis Pass</h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wide text-emerald-400 uppercase">
              Owned
            </span>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={BADGE_IMAGE}
            width={400}
            height={400}
            alt="ARCora Genesis Pass"
            className="w-full"
          />
        </div>

        <div className="mt-5">
          <h3 className="text-base font-bold">ARCora Early Access Badge</h3>
          <p className="text-zinc-500 text-sm mt-1">Genesis Collection</p>
        </div>

        <div className="mt-5 pt-4 border-t border-white/5 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-500">Collection</span>
            <span className="font-semibold">Genesis</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Network</span>
            <span className="text-purple-400 font-medium">Arc Testnet</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Contract</span>
            <span className="font-mono">
              {CONTRACT_ADDRESS
                ? `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`
                : "-"}
            </span>
          </div>
        </div>

        {CONTRACT_ADDRESS && (
          <a
            href={`https://testnet.arcscan.app/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="
            block
            text-center
            mt-5
            bg-zinc-800
            border
            border-white/5
            hover:bg-zinc-700
            hover:border-purple-500/30
            duration-300
            rounded-xl
            py-2.5
            text-xs
            font-semibold
            "
          >
            View Contract on Explorer ↗
          </a>
        )}

      </div>

    </section>
  );
}