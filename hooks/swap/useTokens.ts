"use client";

import { useState } from "react";

export function useTokens() {

  const [tokenIn, setTokenIn] =
    useState("USDC");

  const tokenOut =

    tokenIn === "USDC"

      ?

      "EURC"

      :

      "USDC";

  function reverseTokens() {

    setTokenIn(
      tokenOut
    );

  }

  return {

    tokenIn,

    tokenOut,

    setTokenIn,

    reverseTokens

  };

}