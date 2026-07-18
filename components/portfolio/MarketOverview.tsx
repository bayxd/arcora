"use client";

import { useEffect, useState } from "react";

type Coin = {
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export default function LiveMarketOverview() {

  const [coins, setCoins] =
    useState<Coin[]>([]);

  useEffect(() => {

    async function load() {

      const response =
        await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana"
        );

      const data =
        await response.json();

      setCoins(data);

    }

    load();

  }, []);

  return (

    <section
      className="
      bg-zinc-900/70
      border
      border-white/10
      rounded-[40px]
      p-8
      backdrop-blur-xl
      shadow-2xl
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Market Overview
      </h2>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        "
      >

        {

          coins.map(

            (coin) => (

              <div

                key={coin.symbol}

                className="
                bg-zinc-800
                rounded-3xl
                p-6
                "

              >

                <div
                  className="
                  text-zinc-500
                  uppercase
                  "
                >
                  {coin.symbol}
                </div>

                <div
                  className="
                  text-3xl
                  font-bold
                  mt-3
                  "
                >
                  $

                  {

                    coin.current_price
                      .toLocaleString()

                  }

                </div>

                <div
                  className={
                    coin.price_change_percentage_24h >= 0

                    ?

                    "text-green-400 mt-2"

                    :

                    "text-red-400 mt-2"
                  }
                >

                  {

                    coin.price_change_percentage_24h
                      .toFixed(2)

                  }

                  %

                </div>

              </div>

            )

          )

        }

      </div>

    </section>

  );

}