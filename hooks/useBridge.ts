"use client";

import { toast } from "sonner";

import { AppKit } from "@circle-fin/app-kit";

import {
  connectBrowserWallet
} from "@/lib/send/browserWallet";

const kit =
  new AppKit();

export function useBridge() {

  async function bridge(

    amount: string,

    fromChain: string,

    toChain: string

  ) {

    try {

      const {

        adapter,

        walletName,

        connectedAddress

      } = await connectBrowserWallet();

      const result =
        await kit.bridge({

          from: {

            adapter,

            chain:
              fromChain as any

          },

          to: {

            adapter,

            chain:
              toChain as any

          },

          amount

        });

      return {

        success: true,

        result,

        walletName,

        connectedAddress

      };

    }

    catch (error: any) {

      console.error(error);

      toast.error(

        error.message ??

        "Bridge failed"

      );

      return {

        success: false,

        message:

          error.message ??

          "Bridge failed"

      };

    }

  }

  return {

    bridge

  };

}