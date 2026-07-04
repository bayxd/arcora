"use client";

import { useStreams } from "@/hooks/useStreams";

export default function ActiveStreams() {
  const { streams, accruedOf, withdraw, withdrawingId } = useStreams();

  return (
    <section className="relative overflow-hidden bg-zinc-900/80 border border-white/10 rounded-2xl p-6 shadow-xl">

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

      <div className="mb-5">
        <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
          // Active Streams
        </p>
        <h2 className="text-xl font-bold tracking-tight">Your Streams</h2>
      </div>

      {streams.length === 0 ? (
        <div className="bg-zinc-800/60 border border-white/5 rounded-xl py-10 text-center text-zinc-600 text-xs font-mono">
          No streams yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-medium pb-3 border-b border-white/5">
                  Recipient
                </th>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-medium pb-3 border-b border-white/5">
                  Rate
                </th>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-medium pb-3 border-b border-white/5 w-56">
                  Streamed
                </th>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-medium pb-3 border-b border-white/5">
                  Status
                </th>
                <th className="pb-3 border-b border-white/5" />
              </tr>
            </thead>

            <tbody>
              {streams.map((s) => {
                const accrued = accruedOf(s);
                const pct = Math.min(100, (accrued / s.totalAmount) * 100);
                const withdrawable = accrued - s.withdrawnAmount;
                const canWithdraw =
                  withdrawable > 0.000001 && withdrawingId !== s.id;

                return (
                  <tr key={s.id} className="border-b border-white/5 last:border-none">

                    <td className="py-4 pr-4">
                      <div className="font-bold text-sm">
                        {s.recipient.slice(0, 6)}...{s.recipient.slice(-4)}
                      </div>
                      <div className="text-zinc-600 text-[11px] font-mono mt-0.5">
                        {s.token}
                      </div>
                    </td>

                    <td className="py-4 pr-4 font-mono text-sm text-zinc-300 whitespace-nowrap">
                      {s.ratePerSecond.toFixed(5)} {s.token}/s
                    </td>

                    <td className="py-4 pr-4">
                      <div className="font-mono text-sm">
                        {accrued.toFixed(4)} / {s.totalAmount} {s.token}
                      </div>
                      <div className="h-[5px] rounded-full bg-zinc-800 overflow-hidden mt-1.5 w-full max-w-[180px]">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 transition-[width] duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-4 pr-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-mono ${
                          s.status === "active"
                            ? "text-emerald-400"
                            : "text-zinc-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            s.status === "active"
                              ? "bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse"
                              : "bg-zinc-600"
                          }`}
                        />
                        {s.status === "active" ? "Streaming" : "Completed"}
                      </span>
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => withdraw(s.id)}
                        disabled={!canWithdraw}
                        className="
                        text-[11px]
                        font-mono
                        uppercase
                        tracking-widest
                        px-3.5
                        py-2
                        rounded-lg
                        border
                        border-white/10
                        text-zinc-400
                        hover:text-white
                        hover:border-purple-500/40
                        duration-200
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                        whitespace-nowrap
                        "
                      >
                        {withdrawingId === s.id ? "Withdrawing..." : "Withdraw"}
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </section>
  );
}