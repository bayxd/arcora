"use client";

import {
  useAccount,
  useBalance
} from "wagmi";

export default function TotalAssets() {

  const { address } =
    useAccount();

  const {
    data: usdc
  } =
    useBalance({

      address,

      token:
        "0x3600000000000000000000000000000000000000" as `0x${string}`

    });

  const {
    data: eurc
  } =
    useBalance({

      address,

      token:
        "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a" as `0x${string}`

    });

  const usdcValue =

    Number(
      usdc?.formatted ?? 0
    );

  const eurcValue =

    Number(
      eurc?.formatted ?? 0
    );

  const total =

    usdcValue +

    eurcValue;

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
        bg-linear-to-r
        from-purple-400
        via-pink-500
        to-blue-500
        text-transparent
        bg-clip-text
        "
      >
        {total.toFixed(2)}
      </span>

      <span
        className="
        text-zinc-500
        text-sm
        mt-1
        "
      >
        USD
      </span>

    </div>

  );

}