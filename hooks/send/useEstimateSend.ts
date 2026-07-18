"use client";

import { useState } from "react";

import {
  AppKit,
  type SendParams
} from "@circle-fin/app-kit";

import {
  connectBrowserWallet
} from "@/lib/send/browserWallet";

const kit =
  new AppKit();

export function useEstimateSend() {

  const [

    estimate,

    setEstimate

  ] = useState<any>(null);

  async function getEstimate(

    amount: string,

    recipient: string

  ) {

    try {

      const {

        adapter

      } = await connectBrowserWallet();

      const sendParams:

        SendParams = {

        from: {

          adapter,

          chain:
            "Arc_Testnet"

        },

        to:
          recipient,

        amount,

        token:
          "USDC"

      };

      const data =

        await kit.estimateSend(

          sendParams

        );

      setEstimate(
        data
      );

      return {

        success:
          true,

        estimate:
          data

      };

    }

    catch (error: any) {

      console.error(
        error
      );

      return {

        success:
          false,

        message:

          error.message ??

          "Estimate failed"

      };

    }

  }

  return {

    estimate,

    getEstimate

  };

}