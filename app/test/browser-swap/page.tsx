"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useWalletClient } from "wagmi";

import { createViemAdapterFromProvider } from "@circle-fin/adapter-viem-v2";
import { createSwapKitContext, swap } from "@circle-fin/swap-kit";

export default function BrowserSwapTest() {
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function runTest() {
    try {
      if (!walletClient) {
        toast.error("Wallet belum connect");
        return;
      }

      setLoading(true);

      // FIX 1: provider benar
      const provider = (window as any).ethereum;

      if (!provider) {
        throw new Error("MetaMask provider tidak ditemukan");
      }

      console.dir(window.ethereum);
      console.log(window.ethereum);
    
      console.log("NEXT_PUBLIC_KIT_KEY =", process.env.NEXT_PUBLIC_KIT_KEY);
      // adapter browser
      const adapter = await createViemAdapterFromProvider({
        provider,
      });

      console.log("Adapter OK:", adapter);

      const kit = createSwapKitContext();

      // FIX 2: langsung swap (bukan estimateSwap)
      const res = await swap(kit, {
        from: {
          adapter,
          chain: "Arc_Testnet",
        },
        tokenIn: "USDC",
        tokenOut: "EURC",
        amountIn: "1",
        config: {
          kitKey: process.env.NEXT_PUBLIC_KIT_KEY as string,
        },
      });

      console.log("RESULT:", res);
      setResult(res);

      toast.success("Browser swap SUCCESS 🎉");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Test failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Browser Swap Test</h1>

      <button
        onClick={runTest}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        {loading ? "Testing..." : "Test Browser Swap"}
      </button>

      {result && (
        <pre className="text-xs bg-black/40 p-4 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}