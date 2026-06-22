# ARCora

### Swap. Mint. Own.
https://arcora-opal.vercel.app/

ARCora is a modern Web3 dashboard built with Next.js, TypeScript, Tailwind CSS, Wagmi, RainbowKit, and Circle Web3 Services.

Designed with a premium UI inspired by Uniswap and Magic Eden, ARCora provides a seamless experience for managing assets, swapping stablecoins, bridging assets across chains, and collecting NFTs.

---

## Features

### Wallet Connection

* Connect wallet with RainbowKit
* Multi-wallet support
* Real-time account information

### Portfolio Dashboard

* USDC balance
* EURC balance
* NFT holdings
* Total assets overview

### Token Swap

* Swap between USDC and EURC
* Powered by Circle Developer Controlled Wallets
* Transaction history

## Cross-Chain Bridge

* Bridge assets across supported chains
* Powered by Circle Bridge Kit
* Track bridge transactions
* Multi-chain support

### NFT Collection

* Mint ARCora Early Access Badge
* Genesis Collection
* View owned NFTs
* NFT details page

### Premium UI

* Dark mode design
* Glassmorphism effects
* Responsive layout
* Inspired by Uniswap and Magic Eden

---

## Tech Stack

* Next.js 15
* TypeScript
* Tailwind CSS
* Wagmi
* RainbowKit
* Viem
* Circle AppKit
* Circle Swap Kit
* Circle Bridge Kit
* Circle Web3 Services
* Vercel

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
# DASHBOARD
<img width="1185" height="938" alt="Screenshot 2026-06-18 074019" src="https://github.com/user-attachments/assets/9c7d1182-bbf1-4622-a6fd-ca5c4ecc10ed" />



# NFTS
<img width="891" height="837" alt="Screenshot 2026-06-18 074129" src="https://github.com/user-attachments/assets/86c6d209-655c-4bf6-a8e5-5b2a761edd29" />



# SWAP
<img width="1599" height="926" alt="Screenshot 2026-06-22 145125" src="https://github.com/user-attachments/assets/e2bfdf85-0d50-422c-908f-80b7c8b75173" />



# BRIDGE
<img width="1187" height="792" alt="Screenshot 2026-06-18 074302" src="https://github.com/user-attachments/assets/ce5fd9fb-8733-4148-a4d7-44b6fd77e4c5" />



# PORTFOLIO
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

This response indicates that routing or liquidity is temporarily unavailable on Arc Testnet rather than an application error.

ARCora implements retry and recovery mechanisms and is designed to gracefully handle these situations. Once routes become available again, swaps can proceed normally.

---

## License

MIT License

---

Built with ❤️ using Next.js and Circle Web3 Services.
