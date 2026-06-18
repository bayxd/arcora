import { AppKit } from "@circle-fin/app-kit";

import {
  createViemAdapterFromPrivateKey
} from "@circle-fin/adapter-viem-v2";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const amount =
      body.amount;

    const fromChain =
      body.fromChain;

    const toChain =
      body.toChain;

    if (
      amount === undefined ||
      fromChain === undefined ||
      toChain === undefined
    ) {

      return Response.json(
        {
          success: false,
          error:
            "amount, fromChain, dan toChain wajib diisi"
        },
        {
          status: 400
        }
      );

    }

    if (
      !process.env.PRIVATE_KEY
    ) {

      throw new Error(
        "PRIVATE_KEY tidak ditemukan"
      );

    }

    console.log(
      "=========================="
    );

    console.log(
      "START BRIDGE"
    );

    console.log(
      "FROM =",
      fromChain
    );

    console.log(
      "TO =",
      toChain
    );

    console.log(
      "AMOUNT =",
      amount
    );

    const adapter =
      createViemAdapterFromPrivateKey({

        privateKey:
          process.env.PRIVATE_KEY

      });

    const kit =
      new AppKit();

    const result =
      await kit.bridge({

        from: {

          adapter,

          chain:
            fromChain

        },

        to: {

          adapter,

          chain:
            toChain

        },

        amount:
          String(amount)

      });

    console.log(
      "BRIDGE SUCCESS"
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

  catch (
    error: any
  ) {

    console.log(
      "=========================="
    );

    console.log(
      "BRIDGE FAILED"
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
          error?.type

      },

      {

        status: 500

      }

    );

  }

}