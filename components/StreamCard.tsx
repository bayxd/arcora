"use client";

import { useState } from "react";

import { useStreams } from "@/hooks/useStreams";

const DURATION_OPTIONS = [
  { value: 3600, label: "1 Hour" },
  { value: 86400, label: "24 Hours" },
  { value: 2592000, label: "30 Days" },
];

export default function StreamCard() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("1000");
  const [duration, setDuration] = useState(86400);

  const { streams, accruedOf, startStream, feeRate, isHolder } = useStreams();

  const activeStream = streams.find((s) => s.status === "active");

  const amountNum = parseFloat(amount) || 0;
  const feeAmount = amountNum * feeRate;

  const accrued = activeStream ? accruedOf(activeStream) : 0;
  const total = activeStream?.totalAmount ?? 0;
  const pct = total > 0 ? Math.min(100, (accrued / total) * 100) : 0;
  const ratePerSecond = activeStream?.ratePerSecond ?? 0;

  const RADIUS = 100;
  const CIRC = 2 * Math.PI * RADIUS;

  function handleStart() {
    startStream(recipient, amountNum, duration);
    setRecipient("");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* CREATE STREAM */}
      <section className="relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl">

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

        <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
        <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
        <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(168,85,247,0.7) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative">

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
                // New Stream
              </p>
              <h2 className="text-xl font-bold tracking-tight">Start a Stream</h2>
            </div>
            <div className="bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-1 text-purple-300 text-[10px] font-mono font-semibold tracking-widest">
              USDC
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold">
              Recipient Address
            </p>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-zinc-800/80 border border-white/5 rounded-2xl p-3.5 text-sm font-mono outline-none focus:border-purple-500/30 duration-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="space-y-2">
              <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold">
                Total Amount
              </p>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
                className="w-full h-14 flex items-center bg-zinc-800/80 border border-white/5 rounded-2xl px-3.5 text-lg font-bold font-mono tabular-nums outline-none focus:border-purple-500/30 duration-300"
              />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-semibold">
                Duration
              </p>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-14 appearance-none bg-zinc-800/80 border border-white/5 rounded-2xl px-3.5 text-sm font-semibold outline-none cursor-pointer focus:border-purple-500/30 duration-300 bg-[url('data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a1a1aa%22 stroke-width=%222%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center]"
              >
                {DURATION_OPTIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-zinc-900/50 border border-white/5 p-3.5 text-xs flex items-center justify-between">
            <span className="text-zinc-500">Settlement</span>
            <span className="font-mono text-purple-400">Arc Testnet · USDC</span>
          </div>

          {isHolder ? (
            <div className="mt-4 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wide text-emerald-400 uppercase">
                Genesis Pass · Fee Reduced 50%
              </span>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-white/5 bg-zinc-900/50 px-3.5 py-2.5 text-[11px] text-zinc-500">
              Mint a{" "}
              <a href="/genesis" className="text-purple-400 hover:text-purple-300">
                Genesis Pass
              </a>{" "}
              to cut stream fees in half.
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-xs font-mono border-t border-dashed border-white/10 pt-3">
            <span className="text-zinc-500">Stream Fee (est.)</span>
            <span
              className={
                isHolder
                  ? "text-emerald-400 font-semibold"
                  : "text-zinc-300 font-semibold"
              }
            >
              {feeAmount.toFixed(3)} USDC ({(feeRate * 100).toFixed(2)}%)
            </span>
          </div>

          <button
            onClick={handleStart}
            className="
            group
            relative
            w-full
            h-12
            mt-5
            rounded-xl
            text-sm
            font-bold
            tracking-wide
            uppercase
            overflow-hidden
            bg-linear-to-r
            from-purple-600
            via-pink-500
            to-blue-500
            hover:scale-[1.01]
            active:scale-[0.99]
            duration-300
            shadow-[0_0_20px_rgba(168,85,247,0.25)]
            hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]
            "
          >
            <span className="relative z-10">Start Streaming →</span>
          </button>

        </div>

      </section>

      {/* LIVE RING */}
      <section className="relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[28px] p-6 shadow-2xl flex flex-col items-center justify-center text-center">

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 via-pink-500 to-purple-600" />

        <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-4">
          // Live Stream
        </p>

        <div className="relative w-56 h-56 flex items-center justify-center">

          <div className="pointer-events-none absolute -top-1 -left-1 h-4 w-4 border-t border-l border-purple-400/50" />
          <div className="pointer-events-none absolute -top-1 -right-1 h-4 w-4 border-t border-r border-blue-400/50" />
          <div className="pointer-events-none absolute -bottom-1 -left-1 h-4 w-4 border-b border-l border-purple-400/25" />
          <div className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 border-b border-r border-blue-400/25" />

          <svg width="224" height="224" viewBox="0 0 224 224" className="-rotate-90">
            <circle
              cx="112"
              cy="112"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            <circle
              cx="112"
              cy="112"
              r={RADIUS}
              fill="none"
              stroke="url(#streamRingGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC - (CIRC * pct) / 100}
              style={{ transition: "stroke-dashoffset 0.2s linear" }}
            />
            <defs>
              <linearGradient id="streamRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="55%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {activeStream && (
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "5s" }}
            >
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6]" />
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-mono text-xl font-bold">
              {accrued.toFixed(6)}
              <span className="text-xs text-zinc-500"> USDC</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1.5">
              +{ratePerSecond.toFixed(5)} / sec
            </div>
          </div>

        </div>

        <div className="mt-5 text-xs font-mono text-zinc-500">
          {activeStream ? (
            <>
              To{" "}
              <span className="text-zinc-300">
                {activeStream.recipient.slice(0, 6)}...
                {activeStream.recipient.slice(-4)}
              </span>
            </>
          ) : (
            "No active stream yet"
          )}
        </div>

      </section>

    </div>
  );
}