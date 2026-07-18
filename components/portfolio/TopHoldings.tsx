"use client";

export default function TopHoldings() {

  const holdings = [

    {
      name: "USDC",
      percentage: "54%"
    },

    {
      name: "EURC",
      percentage: "41%"
    },

    {
      name: "NFT",
      percentage: "5%"
    }

  ];

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
        Top Holdings
      </h2>

      <div
        className="
        space-y-6
        "
      >

        {

          holdings.map(

            (item) => (

              <div

                key={item.name}

                className="
                flex
                items-center
                justify-between
                bg-zinc-800
                rounded-2xl
                p-5
                "

              >

                <div
                  className="
                  text-lg
                  font-semibold
                  "
                >
                  {item.name}
                </div>

                <div
                  className="
                  text-purple-400
                  font-bold
                  "
                >
                  {item.percentage}
                </div>

              </div>

            )

          )

        }

      </div>

    </section>

  );

}