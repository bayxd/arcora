"use client";

import { useState } from "react";

import { AppKit } from "@circle-fin/app-kit";

import { connectBrowserWallet } from "@/lib/send/browserWallet";

import { CHAINS } from "@/constants/chains";

const kit = new AppKit();

export default function SwapPoc() {

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  async function testEstimate() {

    try {

      setLoading(true);

      const {

        adapter,

        connectedAddress,

        walletName

      } = await connectBrowserWallet();

      console.log("Wallet:", walletName);

      console.log("Address:", connectedAddress);

      const estimate = await kit.estimateSwap({

        from: {

          adapter,

          chain: CHAINS.ARC_TESTNET,

        },

        tokenIn: "USDC",

        tokenOut: "EURC",

        amountIn: "1",

        config: {

          kitKey: process.env.NEXT_PUBLIC_KIT_KEY!

        }

      });

      console.log(estimate);

      setResult(estimate);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="rounded-3xl bg-zinc-900 p-8 mt-8">

      <button

        onClick={testEstimate}

        disabled={loading}

        className="bg-blue-600 px-6 py-3 rounded-xl"

      >

        {

          loading

            ?

            "Estimating..."

            :

            "Test Estimate"

        }

      </button>

      {

        result && (

          <pre className="mt-8 text-xs overflow-auto">

            {

              JSON.stringify(

                result,

                null,

                2

              )

            }

          </pre>

        )

      }

    </div>

  );

}