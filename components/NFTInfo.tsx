"use client";

import {
  useReadContract,
  useWriteContract
} from "wagmi";

import {
  NFT_ADDRESS
} from "../lib/contracts";


const abi = [

  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },

  {
    type: "function",
    name: "mint",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  }

] as const;

export default function NFTInfo() {
  const {
    writeContract
  } = useWriteContract();

  const { data } =
    useReadContract({

      address:
        NFT_ADDRESS as `0x${string}`,

      abi,

      functionName:
        "totalSupply"

    });

  const minted =

    Number(
      data ?? 0
    );

  const percentage =

    (minted / 1000) * 100;

  return (

      <section
        className="
        bg-zinc-900/70
        backdrop-blur-xl
        border
        border-white/10
        rounded-4xl
        p-12
        shadow-2xl
        w-full
        max-w-5xl
        "
      >

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <div>

          <h2
            className="
            text-3xl
            font-bold
            "
          >
            ARCora NFT Collection
          </h2>

          <p
            className="
            text-zinc-400
            mt-2
            "
          >
            Early Access Badge Collection
          </p>

        </div>


        <div
          className="
          bg-purple-500/20
          border
          border-purple-500/30
          rounded-full
          px-5
          py-2
          text-purple-300
          font-semibold
          "
        >
          Genesis
        </div>

      </div>

        <div
        className="
        mt-10
        bg-zinc-800/80
        rounded-3xl
        p-10
        space-y-10
        "
        >

        <div
          className="
          grid
          md:grid-cols-2
          gap-10
          "
        >

          <div>

            <p className="text-zinc-500 text-sm">
              Total Minted
            </p>

            <h3
              className="
              text-5xl
              font-black
              mt-3
              "
            >
              {minted}

              <span
                className="
                text-zinc-500
                text-2xl
                ml-3
                "
              >
                /1000
              </span>

            </h3>

          </div>

          <div className="text-right">

            <p className="text-zinc-500 text-sm">
              Tier
            </p>

            <div
              className="
              text-purple-400
              font-bold
              text-2xl
              mt-3
              "
            >
              Early Access
            </div>

          </div>

        </div>
        <div
          className="
          grid
          md:grid-cols-2
          gap-10
          pt-8
          border-t
          border-white/10
          "
        >

          <div>

            <p className="text-zinc-500 text-sm">
              Collection
            </p>

            <div
              className="
              text-xl
              font-bold
              mt-3
              "
            >
              Genesis
            </div>

          </div>

          <div className="text-right">

            <p className="text-zinc-500 text-sm">
              Status
            </p>

            <div
              className="
              text-green-400
              font-semibold
              text-xl
              mt-3
              "
            >
              Active ✓
            </div>

          </div>

        </div>
                <div
                  className="
                  mt-8
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    text-sm
                    text-zinc-500
                    "
                  >

                    <span>

                      Mint Progress

                    </span>

                    <span>

                      {percentage.toFixed(1)}%

                    </span>

                  </div>


                <div
          className="
          h-3
          rounded-full
          bg-zinc-700
          mt-3
          overflow-hidden
          "
        >

          <div
            className="
            h-full
            rounded-full
            bg-linear-to-r
            from-purple-500
            via-pink-500
            to-blue-500
            "
            style={{
              width:
                `${percentage}%`
            }}
          />

        </div>

        </div>
        <div
  className="
  mt-8
  pt-8
  border-t
  border-white/10
  "
>

  <button

    className="
    w-full
    py-5
    rounded-full
    text-xl
    font-bold
    bg-linear-to-r
    from-purple-600
    via-pink-500
    to-blue-500
    hover:scale-[1.02]
    duration-300
    shadow-xl
    shadow-purple-500/20
    "

    onClick={() =>

      writeContract({

        address:
          NFT_ADDRESS as `0x${string}`,

        abi,

        functionName:
          "mint"

      })

    }

  >

    Mint ARCora NFT

  </button>

</div>

      </div>

    </section>

  );

}