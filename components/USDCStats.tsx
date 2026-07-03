"use client";

import {
  useAccount,
  useBalance
} from "wagmi";

export default function USDCStats() {

  const { address } =
    useAccount();

  const { data } =
    useBalance({

      address,

      token:
        (
          "0x3600000000000000000000000000000000000000" as `0x${string}`
        )

    });

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
        {
          Number(
            data?.formatted ?? 0
          ).toFixed(2)
        }
      </span>

      <span
        className="
        text-zinc-500
        text-sm
        mt-2
        "
      >
        USDC
      </span>

      <span
        className="
        text-green-400
        text-xs
        mt-1
        font-semibold
        "
      >
      </span>

    </div>

  );

}