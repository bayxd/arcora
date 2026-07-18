"use client";

export default function ProfitLoss() {

  const profit = 124.32;

  const percentage = 12.8;

  const isProfit =
    profit >= 0;

  return (

    <section
      className="
      bg-zinc-900/70
      border
      border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        Profit & Loss
      </h2>

      <div
        className="
        flex
        flex-col
        gap-4
        "
      >

        <div
          className={`
          text-5xl
          font-black
          ${
            isProfit
              ? "text-green-400"
              : "text-red-400"
          }
          `}
        >

          {

            isProfit

              ?

              "+"

              :

              "-"

          }

          $

          {

            Math.abs(
              profit
            )
            .toFixed(2)

          }

        </div>

        <div
          className={`
          text-xl
          font-bold
          ${
            isProfit
              ? "text-green-400"
              : "text-red-400"
          }
          `}
        >

          {

            isProfit

              ?

              "+"

              :

              "-"

          }

          {

            Math.abs(
              percentage
            )
            .toFixed(1)

          }

          %

        </div>

      </div>

    </section>

  );

}