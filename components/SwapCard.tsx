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

  // 🔥 FIX: normalize output biar tidak error string/number
  const outputAmount = quote?.estimatedOutput?.amount ?? "0";

  return (
    <section
      className="
        bg-zinc-900/80
        backdrop-blur-xl
        border
        border-white/10
        rounded-[40px]
        p-8
        shadow-2xl
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-bold">Swap</h2>
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
    </section>
  );
}