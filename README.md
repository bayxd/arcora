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

### Frontend
* Next.js 16
* React 19
* TypeScript
* TailwindCSS
### Web3
* Wagmi
* Viem
* RainbowKit
### Circle Ecosystem
* @circle-fin/app-kit
* @circle-fin/adapter-viem-v2
### Additional Libraries
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
### PORTFOLIO
<img width="1776" height="899" alt="image" src="https://github.com/user-attachments/assets/5620a01a-c02f-402e-91e9-ae301c975b70" />



### SWAP
<img width="1584" height="897" alt="image" src="https://github.com/user-attachments/assets/5ad27b90-3d70-44da-8056-f388a6cdb8c9" />



### BRIDGE
<img width="1601" height="885" alt="image" src="https://github.com/user-attachments/assets/3aaaee58-8d0a-40bc-852c-f06729de2507" />




### SEND
<img width="1594" height="852" alt="image" src="https://github.com/user-attachments/assets/ccdfba29-bb1f-4ec8-b435-d6a91a9a47f5" />



### GENESIS PASS
<img width="1583" height="896" alt="image" src="https://github.com/user-attachments/assets/05ee10d8-028f-40c7-a4e6-a1f418018e83" />


---

## Deployment

ARCora is deployed on Vercel.

---

### Refactor: NFT Contract Deployment

Refactored the NFT deployment architecture by replacing the custom Solidity ERC-721 contract with Circle's official Smart Contract Template.

Highlights:
- Migrated deployment to the Circle SDK workflow.
- Removed dependency on manually maintained ERC-721 contracts.
- Standardized the deployment process according to Circle documentation.
- Improved integration with Circle Developer Platform.

---


Built with ❤️ using Next.js and Circle Web3 Services.

---
https://x.com/forbyuu
https://t.me/timer28
