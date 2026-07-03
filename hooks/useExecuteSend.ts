"use client";

import { toast } from "sonner";

import {
  AppKit,
  type SendParams
}
from "@circle-fin/app-kit";

import {
  connectBrowserWallet
}
from "@/lib/send/browserWallet";

const kit =
  new AppKit();

export function useExecuteSend() {

  async function executeSend(

    amount: string,

    recipient: string

  ) {

    try {

      const {

        adapter,

        walletName,

        connectedAddress

      } =

        await connectBrowserWallet();

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

      const result =

        await kit.send(

          sendParams

        );

      // Simpan ke riwayat kirim (localStorage)
      const txHash =
        (result as any)?.txHash ??
        (result as any)?.result?.txHash ??
        "";

      const explorerUrl =
        (result as any)?.explorerUrl ??
        (result as any)?.result?.explorerUrl ??
        "";

      const history = JSON.parse(
        localStorage.getItem("sendHistory") ?? "[]"
      );

      history.unshift({
        amount,
        recipient,
        date: new Date().toLocaleString(),
        txHash,
        explorerUrl,
        status: "Completed"
      });

      localStorage.setItem(
        "sendHistory",
        JSON.stringify(history.slice(0, 20))
      );

      toast.success(

        `${amount} USDC sent`

      );

      return {

        success:
          true,

        result,

        walletName,

        connectedAddress

      };

    }

    catch (error: any) {

      console.error(
        error
      );

      toast.error(

        error.message ??

        "Send failed"

      );

      return {

        success:
          false,

        message:

          error.message ??

          "Send failed"

      };

    }

  }

  return {

    executeSend

  };

}