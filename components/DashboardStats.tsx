"use client";

import StatsCard from "./StatsCard";
import USDCStats from "./USDCStats";
import EURCStats from "./EURCStats";
import TotalAssets from "./TotalAssets";

export default function DashboardStats() {

return (

<section
  className="
  relative
  overflow-hidden
  bg-zinc-900/70
  backdrop-blur-xl
  border
  border-white/10
  rounded-[40px]
  p-10
  shadow-2xl
  space-y-2
  "
>

  {/* neon top strip */}
  <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

  {/* HUD corner brackets */}
  <div className="pointer-events-none absolute top-5 left-5 h-4 w-4 border-t border-l border-purple-500/50 rounded-tl-sm" />
  <div className="pointer-events-none absolute top-5 right-5 h-4 w-4 border-t border-r border-blue-500/50 rounded-tr-sm" />
  <div className="pointer-events-none absolute bottom-5 left-5 h-4 w-4 border-b border-l border-purple-500/25 rounded-bl-sm" />
  <div className="pointer-events-none absolute bottom-5 right-5 h-4 w-4 border-b border-r border-blue-500/25 rounded-br-sm" />

  {/* subtle dot grid texture */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(168,85,247,0.7) 1px, transparent 1px)",
      backgroundSize: "18px 18px",
    }}
  />

  <div className="relative">

    {/* Header */}

    <div>

      <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-2 font-mono">
        // Portfolio Feed
      </p>

      <h2
        className="
        text-4xl
        font-bold
        tracking-tight
        "
      >
        Portfolio Overview
      </h2>


    </div>

    {/* Cards */}

    <div
      className="
      grid
      md:grid-cols-1
      xl:grid-cols-1
      gap-2
      mt-3
      "
    >

      <div className="xl:col-span-5">

      <StatsCard
        title="Total Assets"
        value={<TotalAssets />}
      />

      </div>

    </div>

  </div>

</section>

);

}