import {
  createSwapKitContext,
  swap
} from "@circle-fin/swap-kit";

import {
  createViemAdapterFromPrivateKey
} from "@circle-fin/adapter-viem-v2";

export async function POST(request: Request) {

  try {

    const body = await request.json();

    const amount = body.amount;
    const tokenIn = body.tokenIn;
    const tokenOut = body.tokenOut;

    if (
      amount === undefined ||
      tokenIn === undefined ||
      tokenOut === undefined
    ) {

      return Response.json(
        {
          success: false,
          error: "amount, tokenIn, dan tokenOut wajib diisi"
        },
        {
          status: 400
        }
      );

    }

    if (!process.env.PRIVATE_KEY) {

      throw new Error(
        "PRIVATE_KEY tidak ditemukan"
      );

    }

    if (!process.env.KIT_KEY) {

      throw new Error(
        "KIT_KEY tidak ditemukan"
      );

    }

    console.log("================================");
    console.log("BODY =", body);

    const adapter =
      createViemAdapterFromPrivateKey({

        privateKey:
          process.env.PRIVATE_KEY

      });

    console.log("SERVICE ADDRESS =");
  

    const context =
      createSwapKitContext();

    console.log("START SWAP");

    console.log(
      "FROM CHAIN =",
      "Arc_Testnet"
    );

    console.log(
      "TOKEN IN =",
      tokenIn
    );

    console.log(
      "TOKEN OUT =",
      tokenOut
    );

    console.log(
      "AMOUNT =",
      amount
    );

    console.log(
      "ALLOWANCE STRATEGY = APPROVE"
    );

    const result =
      await swap(
        context,
        {

          from: {

            adapter,

            chain:
              "Arc_Testnet"

          },

          tokenIn,

          tokenOut,

          amountIn:
            String(amount),
config: {
  kitKey: process.env.KIT_KEY!,
}

        }
      );

    console.log(
      "SWAP SUCCESS"
    );

    console.dir(
      result,
      {
        depth: null
      }
    );

    return Response.json(
      {

        success: true,

        result

      }
    );

  }

  catch (error: any) {

    console.log(
      "================================"
    );

    console.log(
      "SWAP FAILED"
    );

    console.log(
      "name:",
      error?.name
    );

    console.log(
      "message:",
      error?.message
    );

    console.log(
      "code:",
      error?.code
    );

    console.log(
      "type:",
      error?.type
    );

    console.dir(
      error,
      {
        depth: null
      }
    );

    return Response.json(
      {

        success: false,

        name:
          error?.name,

        message:
          error?.message,

        code:
          error?.code,

        type:
          error?.type,

        cause:
          error?.cause

      },
      {
        status: 500
      }
    );

  }

}