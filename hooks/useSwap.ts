"use client";

import { useState } from "react";
import { toast } from "sonner";

import { SwapStatus } from "@/types/SwapStatus";

import { useQuote } from "./useQuote";
import { useExecuteSwap } from "./useExecuteSwap";

export function useSwap() {

  const [swapResult, setSwapResult] = useState<any>(null);

  const [status, setStatus] =
    useState<SwapStatus>(
      "idle"
    );

  const {

    quote,

    getQuote

  } = useQuote();

  const {

    executeSwap

  } = useExecuteSwap();

  async function swap(

    amount: string,

    tokenIn: string,

    tokenOut: string,

    slippage: string

  ) {

    try {

      setStatus(
        "estimating"
      );

      const estimateData =
        await getQuote(

          amount,

          tokenIn,

          tokenOut,

          slippage

        );

      if (!estimateData.success) {

        setStatus(
          "failed"
        );

        toast.error(
          estimateData.message
        );

        return;

      }

      setStatus(
        "swapping"
      );

      const data =
        await executeSwap(

          amount,

          tokenIn,

          tokenOut,

          slippage

        );

      if (data.success) {

        setSwapResult(data.result);

      }

      if (data.success) {

        setStatus(
          "success"
        );

      }

      else {

        setStatus(
          "failed"
        );

        toast.error(

          data.message ??

          "Swap failed"

        );

      }

    }

    catch (error) {

      console.error(
        error
      );

      setStatus(
        "failed"
      );

      toast.error(
        "Swap failed"
      );

    }

  }

  return {

    status,

    quote,

    swap,

    swapResult

  };

}
