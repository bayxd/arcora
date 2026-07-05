"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CHAINS } from "@/constants/chains";
import { useBridge } from "@/hooks/useBridge";

const NETWORK_OPTIONS = [
  { value: "Base_Sepolia", label: "Base Sepolia", dot: "#3B82F6" },
  { value: "Ethereum_Sepolia", label: "Ethereum Sepolia", dot: "#818CF8" },
  { value: "Arbitrum_Sepolia", label: "Arbitrum Sepolia", dot: "#38BDF8" },
  { value: "Polygon_Amoy_Testnet", label: "Polygon Amoy", dot: "#A78BFA" }
];

const ARC_DOT = "#EC4899";

export default function BridgeCard() {

  const [amount, setAmount] = useState("1");
  const [otherChain, setOtherChain] = useState("Base_Sepolia");
  const [direction, setDirection] = useState<"toArc" | "fromArc">("toArc");
  const [loading, setLoading] = useState(false);

  const fromChain =
    direction === "toArc" ? otherChain : CHAINS.ARC_TESTNET;

  const toChain =
    direction === "toArc" ? CHAINS.ARC_TESTNET : otherChain;

  const otherChainInfo =
    NETWORK_OPTIONS.find((n) => n.value === otherChain) ?? NETWORK_OPTIONS[0];

  const fromDot = direction === "toArc" ? otherChainInfo.dot : ARC_DOT;
  const toDot = direction === "toArc" ? ARC_DOT : otherChainInfo.dot;
  const fromLabel = direction === "toArc" ? otherChainInfo.label : "Arc Testnet";
  const toLabel = direction === "toArc" ? "Arc Testnet" : otherChainInfo.label;

  const { bridge: executeBridge } = useBridge();

  function reverseDirection() {
    setDirection((prev) => (prev === "toArc" ? "fromArc" : "toArc"));
  }

  async function bridgeHandler() {
    try {
      setLoading(true);

      const data = await executeBridge(amount, fromChain, toChain);

      if (data.success) {
        const steps = data.result?.steps ?? [];
        const lastStepWithHash = [...steps]
          .reverse()
          .find((s: any) => s.txHash);

        const txHash = lastStepWithHash?.txHash;
        const explorerUrl = lastStepWithHash?.explorerUrl;

        const history = JSON.parse(
          localStorage.getItem("bridgeHistory") ?? "[]"
        );

        history.unshift({
          amount,
          fromChain,
          toChain,
          date: new Date().toLocaleString(),
          txHash: txHash ?? "",
          explorerUrl: explorerUrl ?? "",
          status: "Completed"
        });

        localStorage.setItem(
          "bridgeHistory",
          JSON.stringify(history.slice(0, 20))
        );
        toast.success(`${amount} USDC bridged`);
      } else {
        toast.error(data.message ?? "Bridge failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Bridge failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section 
    className="
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
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

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

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
              // Cross-Chain Relay
            </p>
            <h2 className="text-xl font-bold tracking-tight">Bridge</h2>
          </div>
          <div className="bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-1 text-purple-300 text-[10px] font-mono font-semibold tracking-widest">
            USDC
          </div>
        </div>

        <div className="relative">

          {/* FROM */}
          <div className="bg-zinc-800/80 border border-white/5 rounded-2xl p-4 relative z-10 hover:border-purple-500/20 duration-300">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: fromDot, boxShadow: `0 0 6px ${fromDot}` }}
              />
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">
                From - {fromLabel}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2.5">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent outline-none text-3xl font-bold font-mono tabular-nums w-32"
              />

              {direction === "toArc" ? (
                <select
                  value={otherChain}
                  onChange={(e) => setOtherChain(e.target.value)}
                  className="bg-zinc-700/80 border border-white/5 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer"
                >
                  {NETWORK_OPTIONS.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="bg-zinc-700/80 border border-white/5 rounded-full px-4 py-2 text-sm font-semibold">
                  Arc Testnet
                </div>
              )}
            </div>
          </div>

          {/* CONNECTOR — signature bridge line */}
          <div className="relative h-12 flex items-center justify-center">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden">
              <div
                className="w-full h-[200%] animate-bridge-flow"
                style={{
                  background: `repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 6px,
                    ${direction === "toArc" ? otherChainInfo.dot : ARC_DOT} 6px,
                    ${direction === "toArc" ? ARC_DOT : otherChainInfo.dot} 12px
                  )`
                }}
              />
            </div>

            <button
              onClick={reverseDirection}
              aria-label="Reverse bridge direction"
              className="
              relative z-10
              w-9 h-9
              rounded-full
              bg-zinc-900
              border border-purple-500/30
              flex items-center justify-center
              text-sm
              text-zinc-300
              shadow-[0_0_12px_rgba(168,85,247,0.25)]
              hover:border-purple-500/60
              hover:shadow-[0_0_18px_rgba(168,85,247,0.4)]
              hover:text-white
              hover:scale-110
              active:scale-95
              duration-300
              "
            >
              ↓
            </button>
          </div>

          {/* TO */}
          <div className="bg-zinc-800/80 border border-white/5 rounded-2xl p-4 relative z-10 hover:border-blue-500/20 duration-300">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: toDot, boxShadow: `0 0 6px ${toDot}` }}
              />
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">
                To - {toLabel}
              </p>
            </div>

            {direction === "toArc" ? (
              <div className="text-3xl font-bold font-mono mt-2.5 text-emerald-400">
                Arc Testnet
              </div>
            ) : (
              <div className="flex items-center justify-between mt-2.5">
                <div className="text-3xl font-bold font-mono text-emerald-400">
                  {otherChainInfo.label}
                </div>

                <select
                  value={otherChain}
                  onChange={(e) => setOtherChain(e.target.value)}
                  className="bg-zinc-700/80 border border-white/5 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer"
                >
                  {NETWORK_OPTIONS.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

        </div>

        <button
          onClick={bridgeHandler}
          disabled={loading}
          className="
          group
          relative
          w-full
          h-12
          mt-4
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
          disabled:opacity-60
          disabled:hover:scale-100
          duration-300
          shadow-[0_0_20px_rgba(168,85,247,0.25)]
          hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]
          "
        >
          <span className="relative z-10">
            {loading ? "Bridging..." : "Bridge USDC"}
          </span>
        </button>

      </div>

    </section>
  );
}