"use client";

import { useState } from "react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip
}
from "recharts";

const datasets = {

  "1D": [
    { value: 210 },
    { value: 215 },
    { value: 213 },
    { value: 218 },
    { value: 220 }
  ],

  "7D": [
    { value: 180 },
    { value: 190 },
    { value: 205 },
    { value: 220 },
    { value: 215 },
    { value: 225 },
    { value: 230 }
  ],

  "30D": [
    { value: 120 },
    { value: 135 },
    { value: 150 },
    { value: 180 },
    { value: 220 },
    { value: 260 },
    { value: 300 }
  ],

  "ALL": [
    { value: 60 },
    { value: 90 },
    { value: 130 },
    { value: 170 },
    { value: 220 },
    { value: 280 },
    { value: 350 }
  ]

};

export default function PerformanceChart() {

  const [period, setPeriod] =
    useState<keyof typeof datasets>("7D");

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

        <div
          className="
          flex
          items-center
          justify-between
          mb-8
          "
        >

          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1 font-mono">
              // Growth Trace
            </p>
            <h2
              className="
              text-2xl
              font-bold
              tracking-tight
              "
            >
              Performance
            </h2>
          </div>

          <div
            className="
            flex
            gap-2
            bg-zinc-800/60
            border
            border-white/5
            rounded-full
            p-1
            "
          >

            {

              Object.keys(
                datasets
              )

              .map(

                (item) => (

                  <button

                    key={item}

                    onClick={() =>
                      setPeriod(
                        item as keyof typeof datasets
                      )
                    }

                    className={`
                    px-4
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold
                    tracking-wide
                    duration-300

                    ${
                      period === item

                      ?

                      "bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"

                      :

                      "text-zinc-400 hover:text-white"
                    }
                    `}
                  >

                    {item}

                  </button>

                )

              )

            }

          </div>

        </div>

        <div
          className="
          h-72
          "
        >

          <ResponsiveContainer>

            <LineChart
              data={
                datasets[
                  period
                ]
              }
            >

              <defs>
                <linearGradient id="performanceLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              <Tooltip
                contentStyle={{
                  background: "rgba(24,24,27,0.9)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px"
                }}
              />

              <Line

                dataKey="value"

                stroke="url(#performanceLine)"

                strokeWidth={4}

                dot={false}

              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>

  );

}