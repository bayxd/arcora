"use client";

import Image from "next/image";

const BADGE_IMAGE =
  "https://gateway.pinata.cloud/ipfs/bafybeidn35bgjvbbss7vwcu6hfwibumgvkd46uonkiq53eqwbs4hmcdo24";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GENESIS_PASS_CONTRACT;

export default function GenesisPassCard() {
  return (
    <section className="bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-4xl p-8 shadow-2xl max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">My Genesis Pass</h2>
        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-sm font-semibold">
          Owned ✓
        </div>
      </div>

      <Image
        src={BADGE_IMAGE}
        width={400}
        height={400}
        alt="ARCora Genesis Pass"
        className="rounded-3xl w-full"
      />

      <div className="mt-6">
        <h3 className="text-xl font-bold">ARCora Early Access Badge</h3>
        <p className="text-zinc-400 mt-2">Genesis Collection</p>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
        <div className="flex justify-between">
          <span className="text-zinc-500 text-sm">Collection</span>
          <span className="font-semibold">Genesis</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 text-sm">Network</span>
          <span className="font-semibold">Arc Testnet</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 text-sm">Contract</span>
          <span className="font-semibold">
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
          className="block text-center mt-6 bg-zinc-800 hover:bg-zinc-700 duration-300 rounded-full py-3 font-semibold"
        >
          View Contract on Explorer ↗
        </a>
      )}
    </section>
  );
}
