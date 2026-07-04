"use client";

import { useAgentIdentity } from "@/hooks/useAgentIdentity";

export default function RegisterAgentCard() {
  const { status, isRegistered, agentId, register } = useAgentIdentity();

  return (
    <section
      className="
      relative
      overflow-hidden
      bg-zinc-900/80
      backdrop-blur-xl
      border
      border-white/10
      rounded-[28px]
      p-6
      shadow-2xl
      w-full
      max-w-200
      "
    >
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
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
              // Counterparty Identity
            </p>
            <h2 className="text-xl font-bold tracking-tight">Trade Identity Registry</h2>
          </div>

          <div
            className="
            bg-purple-500/15
            border
            border-purple-500/30
            rounded-full
            px-3
            py-1
            text-purple-300
            text-[10px]
            font-mono
            font-semibold
            tracking-widest
            "
          >
            ERC-8004
          </div>
        </div>

        {isRegistered ? (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4 text-sm">
            <p className="text-emerald-400 font-semibold">✓ Registered on Arc</p>
            <p className="text-zinc-500 font-mono text-xs mt-1">
              Agent ID #{agentId?.toString()}
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-zinc-500 leading-relaxed mb-5">
              Register a verified onchain identity so buyers and suppliers can find you,
              check your history, and leave feedback after each deal.
            </p>

            <button
              className="
              group
              relative
              w-full
              h-12
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
              disabled:opacity-50
              disabled:hover:scale-100
              "
              disabled={status === "registering"}
              onClick={() => register("ipfs://arcora-agent-metadata")}
            >
              <span className="relative z-10">
                {status === "registering" ? "Registering..." : "Register Trade Identity"}
              </span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}