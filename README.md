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
### DASHBOARD
<img width="1768" height="907" alt="image" src="https://github.com/user-attachments/assets/b8f4540a-324c-4df7-8daa-fabd5a02358b" />



### PORTFOLIO
<img width="1404" height="904" alt="image" src="https://github.com/user-attachments/assets/374e45e3-7889-4c1d-b517-d7639d076518" />



### ESCROW
<img width="1324" height="905" alt="image" src="https://github.com/user-attachments/assets/b1c8a2a1-f082-4a25-8276-93789775af5f" />



### SWAP
<img width="1322" height="905" alt="image" src="https://github.com/user-attachments/assets/5e6abea1-467e-4d52-b139-0937cabc2970" />



### BRIDGE
<img width="1571" height="905" alt="image" src="https://github.com/user-attachments/assets/1c84ba12-d8ef-41d1-b031-1f9e203f103f" />



### SEND
<img width="1752" height="905" alt="image" src="https://github.com/user-attachments/assets/66d16adb-501e-459b-8e28-33180f1da098" />



### GENESIS PASS
<img width="1603" height="901" alt="image" src="https://github.com/user-attachments/assets/591280ab-aea7-4c7a-85ec-4e39d63c1900" />


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
