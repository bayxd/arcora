"use client";

import {
  useAccount,
  useBalance
} from "wagmi";

export default function EURCBalance() {

  const { address } =
    useAccount();

  const {
    data,
    isLoading
  } =
    useBalance({

      address,

      token:
        "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a",

      query: {
        refetchInterval: 5000
      }

    });

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

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          "
        >
          EURC Balance
        </h2>

        <div
          className="
          text-blue-400
          font-semibold
          "
        >
          EURC
        </div>

      </div>


      <div
        className="
        mt-8
        bg-zinc-800
        rounded-2xl
        p-5
        "
      >

        <p
          className="
          text-zinc-500
          text-sm
          "
        >
          Available Balance
        </p>

        <h3
          className="
          text-4xl
          font-bold
          mt-3
          "
        >

          {

            isLoading

            ?

            "Loading..."

            :

            Number(
              data?.formatted ?? 0
            ).toFixed(4)

          }

        </h3>

        <p
          className="
          text-zinc-400
          mt-2
          "
        >
          EURC
        </p>

      </div>


      <div
        className="
        mt-6
        flex
        items-center
        justify-between
        "
      >

        <div>

          <p
            className="
            text-zinc-500
            text-sm
            "
          >
            Network
          </p>

          <p
            className="
            font-semibold
            mt-1
            "
          >
            Arc Testnet
          </p>

        </div>

        <div>

          <p
            className="
            text-zinc-500
            text-sm
            "
          >
            Status
          </p>

          <p
            className="
            text-green-400
            font-semibold
            mt-1
            "
          >
            Active ✓
          </p>

        </div>

      </div>

    </div>

  );

}