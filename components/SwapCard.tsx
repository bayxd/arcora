"use client";

import { useSwap } from "@/hooks/useSwap";
import { useTokens } from "@/hooks/useTokens";
import { useSlippage } from "@/hooks/useSlippage";
import { useAmount } from "@/hooks/useAmount";
import { useBalances } from "@/hooks/useBalances";

import SwapResultCard from "./SwapResultCard";
import SwapInput from "./SwapInput";
import SwapOutput from "./SwapOutput";
import SwapInfo from "./SwapInfo";
import SlippageSelector from "./SlippageSelector";
import SwapButton from "./SwapButton";
import SwapDirectionButton from "./SwapDirectionButton";

export default function SwapCard() {
  const { amount, setAmount } = useAmount();
  const { slippage, setSlippage } = useSlippage();
  const { tokenIn, tokenOut, setTokenIn, reverseTokens } = useTokens();

  const { status, quote, swap, swapResult } = useSwap();

  const { usdcBalance, eurcBalance } = useBalances();

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
        shadow-2xl
      "
    >
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
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
              // Dex Terminal
            </p>
            <h2 className="text-xl font-bold tracking-tight">Swap</h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wide text-emerald-400">
              LIVE
            </span>
          </div>
        </div>

        {/* INPUT */}
        <SwapInput
          amount={amount}
          setAmount={setAmount}
          tokenIn={tokenIn}
          setTokenIn={setTokenIn}
          balance={
            tokenIn === "USDC" ? usdcBalance : eurcBalance
          }
        />

        {/* SWITCH */}
        <SwapDirectionButton onClick={reverseTokens} />

        {/* OUTPUT (FIXED TOTAL) */}
        <SwapOutput
          amount={quote?.estimatedOutput?.amount ?? "0"}
          tokenOut={tokenOut}
          balance={tokenOut === "USDC" ? usdcBalance : eurcBalance}
        />

        {/* SLIPPAGE */}
        <SlippageSelector
          slippage={slippage}
          setSlippage={setSlippage}
        />

        {/* INFO */}
        <SwapInfo
          quote={quote}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          slippage={slippage}
        />

        {/* SWAP BUTTON */}
        <SwapButton
          status={status}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          onClick={() =>
            swap(
              amount,
              tokenIn,
              tokenOut,
              slippage
            )
          }
        />

        {/* RESULT */}
        <SwapResultCard result={swapResult} />
      </div>
    </section>
  );
}