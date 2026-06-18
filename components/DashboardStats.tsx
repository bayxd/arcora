"use client";

import { useAccount } from "wagmi";

import StatsCard from "./StatsCard";
import USDCStats from "./USDCStats";
import EURCStats from "./EURCStats";
import NFTCount from "./NFTCount";
import TotalAssets from "./TotalAssets";

export default function DashboardStats() {

  const { address } =
    useAccount();

  return (

    <section
      className="
      bg-zinc-900/70
      backdrop-blur-xl
      border
      border-white/10
      rounded-[40px]
      p-10
      shadow-2xl
      space-y-8
      "
    >

      {/* Header */}

      <div>

        <h2
          className="
          text-4xl
          font-bold
          "
        >
          Portfolio Overview
        </h2>

        <p
          className="
          text-zinc-400
          mt-3
          "
        >
          Assets, NFTs and balances across ARCora.
        </p>

      </div>


      {/* Cards */}

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-5
        gap-6
        "
      >

        <StatsCard
          title="Wallet"
          value={
            address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "-"
          }
        />

        <StatsCard
          title="USDC"
          value={
            <USDCStats />
          }
        />

        <StatsCard
          title="EURC"
          value={
            <EURCStats />
          }
        />

        <StatsCard
          title="NFT Owned"
          value={
            <NFTCount />
          }
        />

        <StatsCard
          title="Total Assets"
          value={
            <TotalAssets />
          }
        />

      </div>

    </section>

  );

}