# ARCora

### Swap. Mint. Own.
https://arcora-opal.vercel.app/

ARCora is a modern Web3 application built on Arc Testnet, designed to provide a seamless experience for managing stablecoins and NFTs. Powered by Circle App Kit, ARCora combines swapping, transferring, bridging, and NFT utilities into a single interface.

---

## Features

### Wallet Connection
* Connect wallet with Reown kit
* Multi-wallet support
* Real-time account information

### Portfolio Dashboard
* USDC balance
* EURC balance
* NFT holdings
* Total assets overview

### Send Stablecoins
Powered by Circle App Kit Browser Wallet
* Wallet-to-wallet transfers
* USDC transfers on Arc Testnet
* Transaction estimation
* MetaMask and EIP-6963 compatible wallets
* ArcScan transaction verification

### Token Swap
Powered by Circle App Kit
* USDC ⇄ EURC swaps
* Quote estimation
* Slippage settings
* Transaction history
* ArcScan explorer links

### Cross-Chain Bridge
* Bridge assets across supported chains
* Powered by Circle Bridge Kit
* Track bridge transactions
* Multi-chain support

### Genesis Pass
* Access to Swap,Bridge,Send

---

## Tech Stack

# Frontend
* Next.js 16
* React 19
* TypeScript
* TailwindCSS
# Web3
* Wagmi
* Viem
* RainbowKit
# Circle Ecosystem
* @circle-fin/app-kit
* @circle-fin/adapter-viem-v2
# Additional Libraries
* TanStack Query
* Sonner
* Recharts
* Lucide React

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/arcora.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create `.env.local`

```env
PRIVATE_KEY=your_private_key
KIT_KEY=KIT_KEY:your_key_id:your_key_secret
```

---

## Screenshots
## DASHBOARD
<img width="1343" height="808" alt="Screenshot 2026-06-22 212336" src="https://github.com/user-attachments/assets/1ae2a33c-dcea-47ed-9723-09c01170e2d2" />



## SEND
<img width="1337" height="695" alt="image" src="https://github.com/user-attachments/assets/7415ccd6-97cc-471d-aa21-9beb47aeb1a0" />




## SWAP
<img width="1599" height="926" alt="Screenshot 2026-06-22 145125" src="https://github.com/user-attachments/assets/e2bfdf85-0d50-422c-908f-80b7c8b75173" />



## BRIDGE
<img width="1187" height="792" alt="Screenshot 2026-06-18 074302" src="https://github.com/user-attachments/assets/ce5fd9fb-8733-4148-a4d7-44b6fd77e4c5" />



## NFTS
<img width="891" height="904" alt="Screenshot 2026-06-22 224602" src="https://github.com/user-attachments/assets/e8ea4851-57d0-472f-a120-a376474014ca" />



## PORTFOLIO
<img width="878" height="862" alt="Screenshot 2026-06-18 074346" src="https://github.com/user-attachments/assets/c3f3639e-1653-4d3d-b0b9-a48150401e45" />



---

## Deployment

ARCora is deployed on Vercel.

---


# Current Development Status


Circle Swap Kit integration has been completed successfully.

During development, Arc Testnet may occasionally return:

INPUT_UNSUPPORTED_ROUTE
No route available

This response indicates that routing or liquidity is temporarily unavailable rather than an application error.

ARCora implements recovery mechanisms and is designed to gracefully handle temporary infrastructure conditions while remaining ready once routes become available again.


---


Built with ❤️ using Next.js and Circle Web3 Services.

---
https://x.com/forbyuu
https://t.me/timer28
