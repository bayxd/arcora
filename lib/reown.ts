import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arcTestnet } from '@reown/appkit/networks'

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, arcTestnet],
  ssr: true
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arcTestnet],

  metadata: {
    name: "ARCora",
    description: "ARCora",
    url: "http://localhost:3000",
    icons: []
  },

  features: {
    analytics: true,
    swaps: true,
    onramp: true
  }
});