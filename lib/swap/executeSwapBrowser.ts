"use client";

import { AppKit } from "@circle-fin/app-kit";

import { connectBrowserWallet } from "@/lib/send/browserWallet";
import { ensureCircleConfig } from "@/lib/circle";
import { CHAINS } from "@/constants/chains";

const kit = new AppKit();

export async function executeSwapBrowser(
  amount: string,
  tokenIn: string,
  tokenOut: string
) {
  const { kitKey } = ensureCircleConfig();

  const { adapter, connectedAddress, walletName } =
    await connectBrowserWallet();

  const result = await kit.swap({
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

  const status = await kit.waitForSwap({
    result,
    kitKey,
  });

  return { result, status, connectedAddress, walletName };
}