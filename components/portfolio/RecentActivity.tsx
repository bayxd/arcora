"use client";

import { useEffect, useState } from "react";

export default function RecentActivity() {

  const [history, setHistory] =
    useState<any[]>([]);

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
      bg-zinc-900/70
      backdrop-blur-xl
      border
      border-white/10
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
        Recent Activity
      </h2>

      {

        history.length === 0

        ?

        <div
          className="
          text-zinc-500
          py-6
          "
        >
          No activity yet
        </div>

        :

        <div
          className="
          space-y-4
          "
        >

          {

            history
              .slice(0, 5)

              .map(

                (
                  item,
                  index
                ) => (

                  <div

                    key={index}

                    className="
                    flex
                    items-center
                    justify-between
                    bg-zinc-800
                    rounded-2xl
                    p-4
                    "

                  >

                    <div>

                      <div
                        className="
                        font-semibold
                        "
                      >
                        ✓ Swap
                      </div>

                      <div
                        className="
                        text-zinc-400
                        text-sm
                        mt-1
                        "
                      >
                        {item.amount}
                        {" "}
                        {item.tokenIn}
                        {" → "}
                        {item.tokenOut}
                      </div>

                    </div>

                    <div
                      className="
                      text-zinc-500
                      text-sm
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