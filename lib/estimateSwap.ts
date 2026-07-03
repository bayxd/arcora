import { AppKit } from "@circle-fin/app-kit";

import {
  createViemAdapterFromPrivateKey
} from "@circle-fin/adapter-viem-v2";

import { CHAINS } from "@/constants/chains";

const kit = new AppKit();

export async function estimateSwap(

  amount: string,

  tokenIn: string,

  tokenOut: string,

  slippage: string

) {

  if (!process.env.PRIVATE_KEY) {

    throw new Error("PRIVATE_KEY tidak ditemukan");

  }

  if (!process.env.KIT_KEY) {

    throw new Error("KIT_KEY tidak ditemukan");

  }

  const adapter =
    createViemAdapterFromPrivateKey({

      privateKey:
        process.env.PRIVATE_KEY

    });

  const estimate =
    await kit.estimateSwap({

      from: {

        adapter,

        chain:
          CHAINS.ARC_TESTNET

      },

      tokenIn,

      tokenOut,

      amountIn:
        String(amount),

      config: {

        kitKey:
          process.env.KIT_KEY!

      }

    });

  console.log("========== ESTIMATE ==========");

  console.dir(estimate, {
    depth: null,
  });

  console.log("==============================");

  return estimate;

}