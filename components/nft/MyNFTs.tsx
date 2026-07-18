"use client";

import {
  useAccount,
  useReadContract
} from "wagmi";

import {
  NFT_ADDRESS
} from "@/lib/contracts";

import NFTItemCard from "./NFTItemCard";

const abi = [

  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        type: "address"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  },

  {
    name: "tokenOfOwnerByIndex",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        type: "address"
      },
      {
        type: "uint256"
      }
    ],
    outputs: [
      {
        type: "uint256"
      }
    ]
  }

] as const;

export default function MyNFTs() {

  const { address } =
    useAccount();

  const { data: count } =
    useReadContract({

      address:
        NFT_ADDRESS as `0x${string}`,

      abi,

      functionName:
        "balanceOf",

      args: [address!],

      query: {
        enabled: !!address
      }

    });

  const totalNFT =
    Number(count ?? 0);

  return (

    <section
      className="
      bg-zinc-900/70
      backdrop-blur-xl
      border
      border-white/10
      rounded-4xl
      p-8
      shadow-2xl
      "
    >

      <div
        className="
        flex
        items-center
        justify-between
        mb-8
        "
      >

        <div>

          <h2
            className="
            text-3xl
            font-bold
            "
          >
            My NFTs
          </h2>

          <p
            className="
            text-zinc-400
            mt-2
            "
          >
            Collection
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
          {totalNFT} Owned
        </div>

      </div>


      {

        totalNFT === 0

        ?

        <div
          className="
          bg-zinc-800
          rounded-3xl
          py-16
          text-center
          text-zinc-500
          "
        >

          No NFTs Found

        </div>

        :

        <div
          className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
          "
        >

          {

            Array.from({
              length: totalNFT
            })

            .map(

              (_, index) =>

                <NFTItem
                  key={index}
                  index={index}
                />

            )

          }

        </div>

      }

    </section>

  );

}

function NFTItem(
{
  index
}:
{
  index: number
}
) {

  const { address } =
    useAccount();

  const { data } =
    useReadContract({

      address:
        NFT_ADDRESS as `0x${string}`,

      abi,

      functionName:
        "tokenOfOwnerByIndex",

      args: [

        address!,

        BigInt(index)

      ],

      query: {
        enabled: !!address
      }

    });

  return (

    <NFTItemCard

      tokenId={
        data?.toString()
        ??
        "0"
      }

    />

  );

}