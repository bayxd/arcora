"use client";

import {
  useAccount,
  useReadContract
}
from "wagmi";

import {
  NFT_ADDRESS
}
from "@/lib/contracts";

const abi = [

  {

    name: "balanceOf",

    type: "function",

    stateMutability: "view",

    inputs: [
      {
        type: "address"
      }
    ],

    outputs: [
      {
        type: "uint256"
      }
    ]

  }

] as const;

export default function NFTCount() {

  const { address } =
    useAccount();

  const { data } =
    useReadContract({

      address:
        NFT_ADDRESS as `0x${string}`,

      abi,

      functionName:
        "balanceOf",

      args:

        address

          ?

          [address]

          :

          undefined

    });

  const totalNFT =

    Number(
      data ?? 0
    );

  return (

    <div
      className="
      flex
      flex-col
      "
    >

      <span
        className="
        text-4xl
        font-black
        "
      >

        {totalNFT}

      </span>

      <span
        className="
        text-zinc-500
        text-sm
        mt-2
        "
      >

        Genesis NFT

      </span>

      <span
        className="
        text-green-400
        text-xs
        mt-1
        font-semibold
        "
      >

        Owned ✓

      </span>

    </div>

  );

}