"use client";

import { AppKit } from "@circle-fin/app-kit";

import { connectBrowserWallet } from "@/lib/send/browserWallet";
import { ensureCircleConfig } from "@/lib/circle";
import { CHAINS } from "@/constants/chains";

const kit = new AppKit();

export async function estimateSwapBrowser(
  amount: string,
  tokenIn: string,
  tokenOut: string
) {
  const { kitKey } = ensureCircleConfig();

  const { adapter } = await connectBrowserWallet();

  const estimate = await kit.estimateSwap({
    from: {
      adapter,
      chain: CHAINS.ARC_TESTNET,
    },
    tokenIn,
    tokenOut,
    amountIn: String(amount),
    config: {
      kitKey,
    },
  });

  return estimate;
}