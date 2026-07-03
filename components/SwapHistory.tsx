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
      relative
      overflow-hidden
      bg-zinc-900/80
      border
      border-white/10
      rounded-2xl
      p-5
      shadow-xl
      "
    >

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 via-pink-500 to-purple-600" />

      <div
        className="
        flex
        items-center
        justify-between
        mb-4
        "
      >

        <h2
          className="
          text-base
          font-bold
          tracking-tight
          "
        >
          Swap History
        </h2>

        <span
          className="
          text-[10px]
          font-mono
          uppercase
          tracking-widest
          text-zinc-600
          "
        >
          {history.length} {history.length === 1 ? "entry" : "entries"}
        </span>

      </div>

      {

        history.length === 0

        ?

        <div
          className="
          text-zinc-600
          text-center
          py-8
          text-xs
          font-mono
          "
        >
          No transactions yet
        </div>

        :

          <div
            className="
            space-y-2
            max-h-72
            overflow-y-auto
            pr-1.5
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
                  relative
                  bg-zinc-800/60
                  border
                  border-white/5
                  rounded-xl
                  pl-3.5
                  pr-3
                  py-2.5
                  hover:border-purple-500/20
                  duration-200
                  "

                >

                  <span
                    className="
                    absolute
                    left-0
                    top-2.5
                    bottom-2.5
                    w-0.5
                    rounded-full
                    bg-linear-to-b
                    from-purple-500
                    to-blue-500
                    "
                  />

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    "
                  >

                    <div
                      className="
                      text-sm
                      font-semibold
                      font-mono
                      "
                    >
                      {item.amount}
                      {" "}
                      {item.tokenIn}
                      <span className="text-zinc-600 mx-1.5">→</span>
                      {item.tokenOut}
                    </div>

                    {

                    item.txHash &&

                    <a

                      href={item.explorerUrl}

                      target="_blank"

                      rel="noreferrer"

                      className="
                      text-purple-400
                      text-[10px]
                      font-medium
                      hover:text-purple-300
                      shrink-0
                      ml-2
                      "

                    >

                      View ↗

                    </a>

                  }

                  </div>

                  <div
                    className="
                    text-zinc-600
                    text-[10px]
                    font-mono
                    mt-1
                    "
                  >
                    {item.date}
                  </div>

                </div>

              )

            )

          }

        </div>

      }

    </section>

  );

}