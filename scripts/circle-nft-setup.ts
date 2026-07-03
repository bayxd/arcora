// scripts/circle-nft-setup.ts
// Jalankan SEKALI SAJA: npx tsx scripts/circle-nft-setup.ts
import { config } from "dotenv";
config({ path: ".env.local" });

import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import { initiateSmartContractPlatformClient } from "@circle-fin/smart-contract-platform";

const API_KEY = process.env.CIRCLE_API_KEY!;
const ENTITY_SECRET = process.env.CIRCLE_ENTITY_SECRET!;

const wallets = initiateDeveloperControlledWalletsClient({
  apiKey: API_KEY,
  entitySecret: ENTITY_SECRET
});

const contracts = initiateSmartContractPlatformClient({
  apiKey: API_KEY,
  entitySecret: ENTITY_SECRET
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // 1. Bikin wallet set
  const walletSet = await wallets.createWalletSet({
    name: "ARCora NFT Admin"
  });

  const walletSetId = walletSet.data?.walletSet?.id;
  if (!walletSetId) throw new Error("Gagal bikin wallet set");

  // 2. Bikin wallet SCA di Arc Testnet
  const walletResult = await wallets.createWallets({
    walletSetId,
    blockchains: ["ARC-TESTNET"],
    accountType: "SCA",
    count: 1
  });

  const wallet = walletResult.data?.wallets?.[0];
  if (!wallet?.id || !wallet?.address) {
    throw new Error("Gagal bikin wallet");
  }

  console.log("WALLET_ID:", wallet.id);
  console.log("WALLET_ADDRESS:", wallet.address);

  // 3. Deploy kontrak NFT dari template
  const deploy = await contracts.deployContractTemplate({
    id: "76b83278-50e2-4006-8b63-5b1a2a814533",
    blockchain: "ARC-TESTNET",
    name: "ARCora Early Access Badge",
    walletId: wallet.id,
    templateParameters: {
      name: "ARCora Early Access Badge",
      defaultAdmin: wallet.address,
      primarySaleRecipient: wallet.address,
      royaltyRecipient: wallet.address,
      royaltyPercent: 0
    },
    fee: {
      type: "level",
      config: { feeLevel: "MEDIUM" }
    }
  });

  const contractId = deploy.data?.contractIds?.[0];
  const txId = deploy.data?.transactionId;

  if (!contractId || !txId) {
    throw new Error("Deploy gagal: missing contractId atau transactionId");
  }

  console.log("CONTRACT_ID (internal):", contractId);
  console.log("DEPLOY_TX_ID:", txId);
  console.log("Menunggu deploy selesai di blockchain...");

  // 4. Polling status transaksi deploy sampai COMPLETE
  let finalState = "";

  for (let i = 0; i < 30; i++) {
    await sleep(5000);

    const tx = await wallets.getTransaction({ id: txId });
    const state = tx.data?.transaction?.state;

    console.log(`[${i + 1}/30] Status:`, state);

    if (state === "COMPLETE") {
      finalState = state;
      break;
    }

    if (
      state === "FAILED" ||
      state === "DENIED" ||
      state === "CANCELLED"
    ) {
      throw new Error(`Deploy gagal dengan status: ${state}`);
    }
  }

  if (finalState !== "COMPLETE") {
    throw new Error("Timeout menunggu deploy selesai. Cek manual via getTransaction/getContract.");
  }

  // 5. Ambil alamat kontrak ASLI di blockchain (bukan contractId internal)
  const contractDetail = await contracts.getContract({ id: contractId });
  const contractAddress = contractDetail.data?.contract?.contractAddress;

  if (!contractAddress) {
    throw new Error(
      "Deploy sudah COMPLETE tapi contractAddress belum tersedia. Coba jalankan ulang getContract beberapa saat lagi."
    );
  }

  console.log("\n=== DEPLOY BERHASIL ===");
  console.log("CONTRACT ADDRESS (on-chain):", contractAddress);

  console.log("\n=== SIMPAN INI KE .env.local ===");
  console.log("CIRCLE_NFT_WALLET_ID=" + wallet.id);
  console.log("NEXT_PUBLIC_GENESIS_PASS_CONTRACT=" + contractAddress);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});