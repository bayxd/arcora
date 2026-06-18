"use client";

import { useEffect, useState } from "react";

export default function BridgeHistory() {

  const [history, setHistory] =
    useState<any[]>([]);

  useEffect(() => {

    const data =

      JSON.parse(

        localStorage.getItem(
          "bridgeHistory"
        )

        ?? "[]"

      );

    setHistory(data);

  }, []);

  return (

    <section
      className="
      bg-zinc-900/70
      border
      border-white/10
      rounded-4xl
      p-8
      mt-10
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >

        Bridge History

      </h2>

      <div
        className="
        space-y-5
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
                rounded-3xl
                p-5
                "

              >

                <div>

                  {

                    item.amount

                  }

                  {" USDC"}

                </div>

                <div
                  className="
                  text-zinc-400
                  text-sm
                  mt-2
                  "
                >

                  {

                    item.fromChain

                  }

                  {" → "}

                  {

                    item.toChain

                  }

                </div>

                <div
                  className="
                  text-zinc-500
                  text-xs
                  mt-2
                  "
                >

                  {

                    item.date

                  }

                </div>

                <div
                    className="
                    text-green-400
                    text-sm
                    mt-2
                    "
                    >

                    {

                        item.status

                    }

                    </div>

              </div>

            )

          )

        }

      </div>

    </section>

  );

}