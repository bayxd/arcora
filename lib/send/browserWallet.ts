import type { EIP1193Provider } from "viem";
import { getAccount } from "@wagmi/core";

import {
  createViemAdapterFromProvider
} from "@circle-fin/adapter-viem-v2";

import {
  BaseSepolia,
  ArcTestnet
} from "@circle-fin/app-kit/chains";

import { wagmiAdapter } from "@/lib/reown";

export async function connectBrowserWallet() {
  const account = getAccount(wagmiAdapter.wagmiConfig);

  if (!account.isConnected || !account.address || !account.connector) {
    throw new Error("Wallet not connected. Please connect your wallet first.");
  }

  const provider =
    await account.connector.getProvider() as EIP1193Provider;

  const adapter =
    await createViemAdapterFromProvider({
      provider,
      capabilities: {
        supportedChains: [BaseSepolia, ArcTestnet]
      }
    });

  return {
    adapter,
    connectedAddress: account.address,
    walletName: account.connector.name
  };
}