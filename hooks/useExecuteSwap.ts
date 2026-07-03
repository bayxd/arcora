"use client";

import { toast } from "sonner";
import { saveSwapHistory } from "@/lib/swapHistory";

export function useExecuteSwap() {

  async function executeSwap(

    amount: string,

    tokenIn: string,

    tokenOut: string,

    slippage: string

  ) {

    const response =
      await fetch(
        "/api/swap",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            amount,

            tokenIn,

            tokenOut,

            slippage

          })

        }
      );

    const data =
      await response.json();

    if (data.success) {
      const txHash =
        data.result?.status?.txHash ??
        data.result?.result?.txHash ??
        data.result?.txHash;

      const explorerUrl =
        data.result?.status?.explorerUrl ??
        data.result?.result?.explorerUrl ??
        data.result?.explorerUrl;

      saveSwapHistory(
        amount,
        tokenIn,
        tokenOut,
        explorerUrl,
        txHash
      );

      toast.success(`${amount} ${tokenIn} → ${tokenOut}`);
    }

    else {

      toast.error(
        data.message
      );

    }

    return data;

  }

  return {

    executeSwap

  };

}