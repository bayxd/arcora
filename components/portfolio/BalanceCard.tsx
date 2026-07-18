"use client";

import {
  useAccount,
  useBalance
} from "wagmi";

export default function BalanceCard() {

  const {
    address,
    isConnected
  } = useAccount();

  const {
    data
  } = useBalance({
    address
  });

  if (!isConnected)
    return null;

  return (

    <div
      className="
      bg-zinc-900
      border
      border-zinc-800
      rounded-3xl
      p-6
      shadow-xl
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Balance
      </h2>

      <div
        className="
        space-y-5
        "
      >

        <div
          className="
          bg-zinc-800
          rounded-2xl
          p-4
          "
        >

          <p
            className="
            text-zinc-400
            text-sm
            "
          >
            Token
          </p>

          <p
            className="
            text-xl
            font-semibold
            mt-2
            "
          >
            {data?.symbol}
          </p>

        </div>

        <div
          className="
          bg-zinc-800
          rounded-2xl
          p-4
          "
        >

          <p
            className="
            text-zinc-400
            text-sm
            "
          >
            Balance
          </p>

          <p
            className="
            text-xl
            font-semibold
            mt-2
            "
          >
            {Number(
              data?.formatted ?? 0
            ).toFixed(4)}
          </p>

        </div>

      </div>

    </div>

  );

}