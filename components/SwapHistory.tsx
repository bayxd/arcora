"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  amount: string;
  tokenIn: string;
  tokenOut: string;
  date: string;
  txHash?: string;
  explorerUrl?: string;
};

export default function SwapHistory() {

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  useEffect(() => {

    const data =
      localStorage.getItem(
        "swapHistory"
      );

    if (data) {

      setHistory(
        JSON.parse(data)
      );

    }

  }, []);

  return (

    <section
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
        Swap History
      </h2>

      {

        history.length === 0

        ?

        <div
          className="
          text-zinc-500
          text-center
          py-10
          "
        >
          No transactions yet
        </div>

        :

          <div
            className="
            space-y-4
            max-h-125
            overflow-y-auto
            pr-2
            "
          >

          {

            history.map(
              (
                item,
                index
              ) => (

                <div

                  key={index}

                  className="
                  bg-zinc-800
                  rounded-2xl
                  p-4
                  "

                >

                  <div
                    className="
                    text-lg
                    font-bold
                    "
                  >
                    {item.amount}
                    {" "}
                    {item.tokenIn}
                    {" → "}
                    {item.tokenOut}
                  </div>

                  <div
                    className="
                    text-zinc-500
                    text-sm
                    mt-2
                    "
                  >
                    {item.date}
                  </div>
                  {

                  item.txHash &&

                  <a

                    href={item.explorerUrl}

                    target="_blank"

                    className="
                    text-purple-400
                    text-sm
                    mt-3
                    inline-block
                    hover:text-purple-300
                    "

                  >

                    View on Explorer ↗

                  </a>

                }

                </div>

              )

            )

          }

        </div>

      }

    </section>

  );

}