"use client";

import { useAccount, useBalance } from "wagmi";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { usePortfolioHistory } from "@/hooks/portfolio/usePortfolioHistory";

const USDC_TOKEN =
  "0x3600000000000000000000000000000000000000" as `0x${string}`;

const EURC_TOKEN =
  "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a" as `0x${string}`;

const COLORS = {
  usdc: "#a855f7",
  eurc: "#3b82f6",
};

function use24hChange(currentTotal: number) {
  const snapshots = usePortfolioHistory("1D");

  if (snapshots.length < 2) return null;

  const first = snapshots[0].totalValueUSD;

  if (first <= 0) return null;

  return ((currentTotal - first) / first) * 100;
}

export default function PortfolioSummary() {
  const { address } = useAccount();

  const { data: usdc } = useBalance({ address, token: USDC_TOKEN });
  const { data: eurc } = useBalance({ address, token: EURC_TOKEN });

  const usdcValue = Number(usdc?.formatted ?? 0);
  const eurcValue = Number(eurc?.formatted ?? 0);
  const total = usdcValue + eurcValue;

  const usdcPct = total > 0 ? (usdcValue / total) * 100 : 0;
  const eurcPct = total > 0 ? (eurcValue / total) * 100 : 0;

  const change24h = use24hChange(total);

  const assetsHeld = [usdcValue, eurcValue].filter((v) => v > 0).length;

  const pieData = [
    { name: "USDC", value: usdcValue || 0.0001 },
    { name: "EURC", value: eurcValue || 0.0001 },
  ];

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
      p-8
      shadow-2xl
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
        <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1 font-mono">
          // Portfolio Feed
        </p>

        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Portfolio Overview
        </h2>

        {/* Stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-zinc-800/60 border border-white/5 rounded-2xl p-4">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">
              Total assets
            </p>
            <p className="text-2xl font-black bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="bg-zinc-800/60 border border-white/5 rounded-2xl p-4">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">
              24h change
            </p>
            <p
              className={`text-2xl font-black ${
                change24h === null
                  ? "text-zinc-600"
                  : change24h >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {change24h === null
                ? "—"
                : `${change24h >= 0 ? "+" : ""}${change24h.toFixed(1)}%`}
            </p>
          </div>

          <div className="bg-zinc-800/60 border border-white/5 rounded-2xl p-4">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">
              Assets held
            </p>
            <p className="text-2xl font-black">{assetsHeld}</p>
          </div>

          <div className="bg-zinc-800/60 border border-white/5 rounded-2xl p-4">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">
              Network
            </p>
            <p className="text-2xl font-black text-emerald-400">Arc</p>
          </div>
        </div>

        {/* Allocation + asset list */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-800/60 border border-white/5 rounded-2xl p-5">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-4">
              Allocation
            </p>

            <div className="flex items-center gap-6">
              <div className="w-28 h-28 shrink-0">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      innerRadius={32}
                      outerRadius={50}
                      paddingAngle={3}
                      stroke="none"
                    >
                      <Cell fill={COLORS.usdc} />
                      <Cell fill={COLORS.eurc} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: COLORS.usdc }}
                  />
                  <span className="text-zinc-300 font-semibold">USDC</span>
                  <span className="text-zinc-500 font-mono">
                    {usdcPct.toFixed(0)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: COLORS.eurc }}
                  />
                  <span className="text-zinc-300 font-semibold">EURC</span>
                  <span className="text-zinc-500 font-mono">
                    {eurcPct.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/60 border border-white/5 rounded-2xl p-5 space-y-2">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">
              Assets
            </p>

            <div className="flex items-center justify-between bg-zinc-900/60 border border-white/5 rounded-xl px-4 py-3 hover:border-purple-500/20 duration-300">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: COLORS.usdc,
                    boxShadow: `0 0 6px ${COLORS.usdc}`,
                  }}
                />
                <span className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
                  USDC
                </span>
              </div>
              <span className="font-mono font-bold text-base tabular-nums">
                {usdcValue.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between bg-zinc-900/60 border border-white/5 rounded-xl px-4 py-3 hover:border-blue-500/20 duration-300">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: COLORS.eurc,
                    boxShadow: `0 0 6px ${COLORS.eurc}`,
                  }}
                />
                <span className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">
                  EURC
                </span>
              </div>
              <span className="font-mono font-bold text-base tabular-nums">
                {eurcValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}