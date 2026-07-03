"use client";

import {
  useAccount,
  useBalance
}
from "wagmi";

export default function EURCStats() {

  const { address } =
    useAccount();

  const { data } =
    useBalance({

      address,

      token:
        (
          "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a" as `0x${string}`
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
        EURC
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