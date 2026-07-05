"use client";

import { useEffect, useState } from "react";

export default function BridgeHistory() {

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("bridgeHistory") ?? "[]"
    );
    setHistory(data);
  }, []);

  return (
    <section className="        
    relative
    w-full
    max-w-[800px]
    mx-auto
    overflow-hidden
    bg-zinc-900/80
    backdrop-blur-xl
    border
    border-white/10
    rounded-[28px]
    p-6
    shadow-2xl">

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 via-pink-500 to-purple-600" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold tracking-tight">
          Bridge History
        </h2>
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          {history.length} {history.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {history.length === 0 ? (
        <div className="bg-zinc-800/60 border border-white/5 rounded-xl py-8 text-center text-zinc-600 text-xs font-mono">
          No bridge transactions yet
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1.5">
          {history.map((item, index) => (
            <div key={index} className="relative bg-zinc-800/60 border border-white/5 rounded-xl pl-3.5 pr-3 py-2.5 hover:border-purple-500/20 duration-200">

              <span
                className="
                absolute
                left-0
                top-2.5
                bottom-2.5
                w-0.5
                rounded-full
                bg-linear-to-b
                from-purple-500
                to-blue-500
                "
              />

              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold font-mono">
                  {item.amount} USDC
                </div>
                <span className="text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
                  {item.status}
                </span>
              </div>

              <div className="text-zinc-400 text-xs font-mono mt-1">
                {item.fromChain} <span className="text-zinc-600">→</span> {item.toChain}
              </div>

              <div className="flex items-center justify-between mt-1">
                <div className="text-zinc-600 text-[10px] font-mono">
                  {item.date}
                </div>

                {item.txHash && (
                  <a
                    href={item.explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 text-[10px] font-medium hover:text-purple-300"
                  >
                    View ↗
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}