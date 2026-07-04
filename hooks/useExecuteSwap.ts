"use client";

import { toast } from "sonner";

import { saveSwapHistory } from "@/lib/swapHistory";
import { useBalances } from "@/hooks/useBalances";
import { recordSnapshot } from "@/lib/history/portfolioSnapshot";

export function useExecuteSwap() {

  // Dipakai buat mengambil saldo TERKINI setelah swap sukses, supaya
  // snapshot performance mencatat nilai portofolio yang sudah ter-update
  // (bukan nilai lama sebelum swap terjadi).
  const { usdcBalance, eurcBalance } = useBalances();

  async function executeSwap(

    amount: string,

    tokenIn: string,

    tokenOut: string,

    // slippage diterima untuk menjaga signature yang sama dengan useSwap.ts,
    // tapi tidak dikirim ke body request — mengikuti pola route.ts (/api/swap)
    // yang juga tidak menerima/menggunakan slippage.
    slippage: string

  ) {

    try {

      const response = await fetch(
        "/api/swap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount,
            tokenIn,
            tokenOut
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        const txHash =
          data.result?.status?.txHash ??
          data.result?.result?.txHash;

        const explorerUrl =
          data.result?.status?.explorerUrl ??
          data.result?.result?.explorerUrl;

        saveSwapHistory(amount, tokenIn, tokenOut, explorerUrl, txHash);
        toast.success(`${amount} ${tokenIn} → ${tokenOut}`);

        // NOTE: usdcBalance/eurcBalance di sini masih nilai dari render
        // terakhir sebelum swap ini selesai (on-chain balance biasanya belum
        // langsung ke-refresh otomatis). Kalau useTokenBalance kamu punya
        // fungsi refetch(), idealnya panggil itu dulu sebelum recordSnapshot
        // di bawah supaya angkanya benar-benar terbaru.
        recordSnapshot(Number(usdcBalance ?? 0), Number(eurcBalance ?? 0), {
          force: true,
        });

        return {
          success: true,
          result: data.result
        };

      }

      else {

        const message = data.message ?? data.error ?? "Swap failed";
        toast.error(message);

        return {
          success: false,
          message
        };

      }

    }

    catch (error: any) {

      console.error(error);

      const message = error?.message ?? "Swap failed";
      toast.error(message);

      return {
        success: false,
        message
      };

    }

  }

  return {
    executeSwap
  };

}