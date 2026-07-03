import { executeSwap } from "@/lib/executeSwap";
import { recoverSwap } from "@/lib/recoverSwap";
import { CHAINS } from "@/constants/chains";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const amount =
      body.amount;

    const tokenIn =
      body.tokenIn;

    const tokenOut =
      body.tokenOut;

    if (

      amount === undefined ||

      tokenIn === undefined ||

      tokenOut === undefined

    ) {

      return Response.json(

        {

          success: false,

          error:
            "amount, tokenIn, dan tokenOut wajib diisi"

        },

        {

          status: 400

        }

      );

    }

    console.log(
      "================================"
    );

    console.log(
      "BODY =",
      body
    );

    console.log(
      "START SWAP"
    );

    console.log(
      "FROM CHAIN =",
      CHAINS.ARC_TESTNET
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

    const result =
      await recoverSwap(

        () =>

          executeSwap(

            String(amount),

            tokenIn,

            tokenOut

          )

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