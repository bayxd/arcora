"use client";

import { useTokenBalance }
from "@/hooks/portfolio/useTokenBalance";

import { TOKENS }
from "@/constants/tokens";

export function useBalances() {

  const usdcBalance =
    useTokenBalance(
      TOKENS.USDC.address
    );

  const eurcBalance =
    useTokenBalance(
      TOKENS.EURC.address
    );

  return {

    usdcBalance,

    eurcBalance

  };

}