"use client";

import { useState } from "react";
import { toast } from "sonner";

import { estimateSwapBrowser } from "@/lib/swap/estimateSwapBrowser";

export function useQuote() {

  const [quote, setQuote] =
    useState<{
      estimatedOutput?: { amount: string; token: string };
      stopLimit?: { amount: string; token: string };
      fees?: { type: string; amount: string; token: string }[];
    } | null>(null);

  async function getQuote(

    amount: string,

    tokenIn: string,

    tokenOut: string,

    _slippage: string

  ) {

    try {

      const estimate = await estimateSwapBrowser(amount, tokenIn, tokenOut);

      setQuote(estimate as any);

      return {
        success: true,
        quote: estimate,
      };

    }

    catch (error: any) {

      console.error(error);

      const message = error?.message ?? "Estimate failed";

      toast.error(message);

      return {
        success: false,
        message,
      };

    }

  }

  return {

    quote,

    getQuote

  };

}