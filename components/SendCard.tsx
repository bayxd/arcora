"use client";

import { useState } from "react";

import { useSend } from "@/hooks/useSend";

export default function SendCard() {

  const [recipient, setRecipient] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const {

    status,

    estimate,

    send

  } = useSend();

  return (

    <section
      className="
      relative
      overflow-hidden
      bg-zinc-900/80
      backdrop-blur-xl
      border
      border-white/10
      rounded-[28px]
      p-6
      shadow-2xl
      w-full
      max-w-md
      "
    >

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

      {/* subtle dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(168,85,247,0.7) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative">

        <div
          className="
          flex
          items-center
          justify-between
          mb-4
          "
        >

          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
              // Transfer Terminal
            </p>
            <h2 className="text-xl font-bold tracking-tight">
              Send
            </h2>
          </div>

          <div
            className="
            bg-purple-500/15
            border
            border-purple-500/30
            rounded-full
            px-3
            py-1
            text-purple-300
            text-[10px]
            font-mono
            font-semibold
            tracking-widest
            "
          >
            USDC
          </div>

        </div>


        {/* Recipient */}

        <div className="space-y-2">

          <p
            className="
            text-[10px]
            tracking-widest
            uppercase
            text-zinc-500
            font-semibold
            "
          >
            Recipient Address
          </p>

          <input

            value={recipient}

            onChange={(e) =>

              setRecipient(
                e.target.value
              )

            }

            placeholder="0x..."

            className="
            w-full
            bg-zinc-800/80
            border
            border-white/5
            rounded-2xl
            p-3.5
            text-sm
            font-mono
            outline-none
            focus:border-purple-500/30
            duration-300
            "

          />

        </div>


        {/* Amount */}

        <div className="space-y-2 mt-4">

          <p
            className="
            text-[10px]
            tracking-widest
            uppercase
            text-zinc-500
            font-semibold
            "
          >
            Amount
          </p>

          <input

            value={amount}

            onChange={(e) =>

              setAmount(
                e.target.value
              )

            }

            placeholder="1.00"

            className="
            w-full
            bg-zinc-800/80
            border
            border-white/5
            rounded-2xl
            p-3.5
            text-2xl
            font-bold
            font-mono
            tabular-nums
            outline-none
            focus:border-blue-500/30
            duration-300
            "

          />

        </div>


        {/* Estimate */}

        {

          estimate &&

          <div
            className="
            mt-4
            rounded-xl
            bg-zinc-900/50
            border
            border-white/5
            p-3.5
            text-xs
            "
          >

            <div
              className="
              flex
              items-center
              justify-between
              "
            >

              <span className="text-zinc-500">
                Estimated Fee
              </span>

              <span className="font-mono font-semibold text-emerald-400">

                {

                  estimate.fee?.toString()

                }

              </span>

            </div>

          </div>

        }


        {/* Button */}

        <button

          className="
          group
          relative
          w-full
          h-12
          mt-5
          rounded-xl
          text-sm
          font-bold
          tracking-wide
          uppercase
          overflow-hidden
          bg-linear-to-r
          from-purple-600
          via-pink-500
          to-blue-500
          hover:scale-[1.01]
          active:scale-[0.99]
          duration-300
          shadow-[0_0_20px_rgba(168,85,247,0.25)]
          hover:shadow-[0_0_28px_rgba(168,85,247,0.4)]
          "

          onClick={() =>

            send(

              amount,

              recipient

            )

          }

        >

          <span className="relative z-10">

          {

            status === "estimating"

              ?

              "Estimating..."

              :

            status === "sending"

              ?

              "Sending..."

              :

              "Send"

          }

          </span>

        </button>

      </div>

    </section>

  );

}