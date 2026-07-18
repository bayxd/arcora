"use client";

import { useReadContract, useAccount } from "wagmi";
import { formatUnits } from "viem";

const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [
      {
        name: "account",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ]
  }
];

export function useTokenBalance(
  tokenAddress: `0x${string}`,
  decimals = 6
) {

  const { address } =
    useAccount();

  const {
    data
  } =
    useReadContract({

      address:
        tokenAddress,

      abi:
        ERC20_ABI,

      functionName:
        "balanceOf",

      args:
        address
          ? [address]
          : undefined

    });

  return Number(
    formatUnits(
      (data as bigint)
      ?? BigInt(0),
      decimals
    )
  );

}