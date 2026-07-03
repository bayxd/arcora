import { NextResponse } from "next/server";
import { estimateSwap } from "@/lib/estimateSwap";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {

      amount,

      tokenIn,

      tokenOut,

      slippage

    } = body;

    if (

      !amount ||

      !tokenIn ||

      !tokenOut

    ) {

      return NextResponse.json(

        {

          success: false,

          message:
            "Missing parameters"

        },

        {

          status: 400

        }

      );

    }

    const quote =
      await estimateSwap(

        amount,

        tokenIn,

        tokenOut,

        slippage

      );

    return NextResponse.json(

      {

        success: true,

        quote

      }

    );

  }

  catch (error) {

    console.error(
      error
    );

    return NextResponse.json(

      {

        success: false,

        message:
          "Estimate failed"

      },

      {

        status: 500

      }

    );

  }

}