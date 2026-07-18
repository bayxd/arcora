"use client";

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  arcTestnet,
  baseSepolia,
  arbitrumSepolia,
  polygonAmoy
} from "@reown/appkit/networks";

import { installCircleProxy } from "@/lib/installCircleProxy";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [
    arcTestnet,
    baseSepolia,
    arbitrumSepolia,
    polygonAmoy
  ],
  ssr: true
});

installCircleProxy();

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [
    arcTestnet,
    baseSepolia,
    arbitrumSepolia,
    polygonAmoy
  ],

  metadata: {
    name: "ARCora",
    description: "ARCora",
    url: "http://localhost:3000",
    icons: []
  },

  features: {
    analytics: true,
    swaps: true,
    onramp: true,


    email: false
  }
});