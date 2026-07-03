import {
  createSwapKitContext,
  swap
}
from "@circle-fin/swap-kit";

import {
  createViemAdapterFromPrivateKey
}
from "@circle-fin/adapter-viem-v2";

import {
  CHAINS
}
from "@/constants/chains";

export async function executeSwap(

  amount: string,

  tokenIn: string,

  tokenOut: string

) {

  if (

    !process.env.PRIVATE_KEY

  ) {

    throw new Error(
      "PRIVATE_KEY tidak ditemukan"
    );

  }

  if (

    !process.env.KIT_KEY

  ) {

    throw new Error(
      "KIT_KEY tidak ditemukan"
    );

  }

  const adapter =
    createViemAdapterFromPrivateKey({

      privateKey:
        process.env.PRIVATE_KEY

    });

  const context =
    createSwapKitContext();

  const result =
    await swap(

      context,

      {

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
            process.env.KIT_KEY

        }

      }

    );

  return result;

}