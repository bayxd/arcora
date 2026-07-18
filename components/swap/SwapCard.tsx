"use client";

import { useEffect, useRef } from "react";

import { useSwap } from "@/hooks/swap/useSwap";
import { useTokens } from "@/hooks/swap/useTokens";
import { useSlippage } from "@/hooks/swap/useSlippage";
import { useAmount } from "@/hooks/swap/useAmount";
import { useBalances } from "@/hooks/swap/useBalances";

import SwapResultCard from "@/components/swap/SwapResultCard";
import SwapInput from "@/components/swap/SwapInput";
import SwapOutput from "@/components/swap/SwapOutput";
import SwapInfo from "@/components/swap/SwapInfo";
import SlippageSelector from "@/components/swap/SlippageSelector";
import SwapButton from "@/components/swap/SwapButton";
import SwapDirectionButton from "@/components/swap/SwapDirectionButton";

export default function SwapCard() {
  const { amount, setAmount } = useAmount();
  const { slippage, setSlippage } = useSlippage();
  const { tokenIn, tokenOut, setTokenIn, reverseTokens } = useTokens();

  const { status, quote, getQuote, swap, swapResult } = useSwap();

  const { usdcBalance, eurcBalance } = useBalances();

  // Live-quote as the user types, debounced so we don't hit the estimate
  // endpoint on every keystroke. This only ever calls getQuote() - it never
  // touches swap()/executeSwap(), so nothing gets executed just from typing
  // an amount.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const numericAmount = Number(amount);
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }

    debounceRef.current = setTimeout(() => {
      getQuote(amount, tokenIn, tokenOut, slippage);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, tokenIn, tokenOut, slippage]);

  return (
    <section
      className="
        relative
        w-full
        max-w-[600px]
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