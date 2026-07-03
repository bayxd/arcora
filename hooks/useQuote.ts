"use client";

import { useState } from "react";

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

    slippage: string

  ) {

    const response =
      await fetch(
        "/api/swap-estimate",
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

    if (
      data.success
    ) {

      setQuote(
        data.quote
      );

    }

    return data;

  }

  return {

    quote,

    getQuote

  };

}