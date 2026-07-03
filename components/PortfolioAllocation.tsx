"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
}
from "recharts";

const data = [

  {
    name: "USDC",
    value: 60
  },

  {
    name: "EURC",
    value: 35
  },

  {
    name: "NFT",
    value: 5
  }

];

const COLORS = [
  "#a855f7",
  "#ec4899",
  "#3b82f6"
];

export default function PortfolioAllocation() {

  return (

    <section
      className="
      relative
      overflow-hidden
      bg-zinc-900/70
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute top-4 left-4 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-4 right-4 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

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
          // Allocation Map
        </p>

        <h2
          className="
          text-2xl
          font-bold
          tracking-tight
          mb-8
          "
        >
          Portfolio Allocation
        </h2>

        <div
          className="
          h-80
          "
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie

                data={data}

                dataKey="value"

                nameKey="name"

                innerRadius={70}

                outerRadius={110}

                paddingAngle={3}

                stroke="rgba(24,24,27,0.9)"

                strokeWidth={2}

              >

                {

                  data.map(
                    (
                      _,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                        style={{
                          filter: `drop-shadow(0 0 6px ${COLORS[index]}88)`
                        }}
                      />

                    )

                  )

                }

              </Pie>

              <Tooltip
                contentStyle={{
                  background: "rgba(24,24,27,0.9)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px"
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">

          {

            data.map(
              (item, index) => (

                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: COLORS[index],
                      boxShadow: `0 0 6px ${COLORS[index]}`
                    }}
                  />
                  <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                    {item.name}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    {item.value}%
                  </span>
                </div>

              )
            )

          }

        </div>

      </div>

    </section>

  );

}