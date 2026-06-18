"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function BridgeCard() {

  const [amount, setAmount] =
    useState("1");

  const [fromChain, setFromChain] =
    useState("Base_Sepolia");

  const [loading, setLoading] =
    useState(false);

  const toChain =
    "Arc_Testnet";

  async function bridge() {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/bridge",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:

              JSON.stringify({

                amount,

                fromChain,

                toChain

              })

          }
        );

      const data =
        await response.json();

      if (data.success) {

        const history =

          JSON.parse(

            localStorage.getItem(
              "bridgeHistory"
            )

            ??

            "[]"

          );

        history.unshift({

          amount,

          fromChain,

          toChain,

          date:

            new Date()
              .toLocaleString(),

          txHash:

            data.result?.txHash

            ??

            data.result?.transactionHash

            ??

            data.result?.sourceTxHash

            ??

            "",

          explorerUrl:

            data.result?.explorerUrl

            ??

            "",

          status:

            "Completed"

        });

        localStorage.setItem(

          "bridgeHistory",

          JSON.stringify(
            history
          )

        );

        toast.success(

          `${amount} USDC bridged`

        );

      }

      else {

        toast.error(

          data.message

          ??

          "Bridge failed"

        );

      }

    }

    catch (error) {

      console.error(error);

      toast.error(

        "Bridge failed"

      );

    }

    finally {

      setLoading(false);

    }

  }

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

      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Bridge
      </h2>

      {/* FROM */}

      <div
        className="
        bg-zinc-800
        rounded-3xl
        p-6
        "
      >

        <p
          className="
          text-zinc-500
          text-sm
          "
        >
          From
        </p>

        <div
          className="
          flex
          items-center
          justify-between
          mt-4
          "
        >

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="
            bg-transparent
            outline-none
            text-4xl
            font-bold
            w-40
            "
          />

          <select
            value={fromChain}
            onChange={(e) =>
              setFromChain(
                e.target.value
              )
            }
            className="
            bg-zinc-700
            rounded-full
            px-5
            py-3
            "
          >

            <option value="Base_Sepolia">
              Base Sepolia
            </option>

            <option value="Ethereum_Sepolia">
              Ethereum Sepolia
            </option>

            <option value="Arbitrum_Sepolia">
              Arbitrum Sepolia
            </option>

            <option value="Polygon_Amoy_Testnet">
              Polygon Amoy
            </option>

          </select>

        </div>

      </div>

      {/* ARROW */}

      <div
        className="
        flex
        justify-center
        my-5
        text-3xl
        "
      >
        ↓
      </div>

      {/* TO */}

      <div
        className="
        bg-zinc-800
        rounded-3xl
        p-6
        "
      >

        <p
          className="
          text-zinc-500
          text-sm
          "
        >
          To
        </p>

        <div
          className="
          text-4xl
          font-black
          mt-4
          "
        >
          Arc Testnet
        </div>

      </div>

      {/* BUTTON */}

      <button

        onClick={bridge}

        disabled={loading}

        className="
        w-full
        mt-8
        py-4
        rounded-full
        text-lg
        font-bold
        bg-linear-to-r
        from-purple-600
        via-pink-500
        to-blue-500
        hover:scale-[1.02]
        duration-300
        disabled:opacity-50
        "

      >

        {

          loading

            ?

            "Bridging..."

            :

            "Bridge USDC"

        }

      </button>

    </section>

  );

}