import { NextResponse } from "next/server";
import { circleWallets } from "@/lib/circle";

function buildTokenURI() {
  const metadata = {
    name: "ARCora Early Access Badge",
    description: "Genesis Collection - ARCora Early Access Badge",
    image:
      "https://gateway.pinata.cloud/ipfs/bafybeidn35bgjvbbss7vwcu6hfwibumgvkd46uonkiq53eqwbs4hmcdo24"
  };

  const base64 = Buffer.from(JSON.stringify(metadata)).toString("base64");
  return `data:application/json;base64,${base64}`;
}

export async function POST(request: Request) {
  try {
    const { recipient } = await request.json();

    if (!recipient) {
      return NextResponse.json(
        { success: false, message: "Missing recipient" },
        { status: 400 }
      );
    }

    // Wallet & kontrak DIKUNCI dari server env, TIDAK menerima dari client.
    // Kalau ini diterima dari body request, siapapun bisa suruh wallet server
    // eksekusi fungsi ke kontrak sembarangan.
    const walletId = process.env.CIRCLE_NFT_WALLET_ID!;
    const contractAddress = process.env.NEXT_PUBLIC_GENESIS_PASS_CONTRACT!;

    if (!walletId || !contractAddress) {
      return NextResponse.json(
        { success: false, message: "Server mint config missing" },
        { status: 500 }
      );
    }

    const tokenURI = buildTokenURI();

    const result = await circleWallets.createContractExecutionTransaction({
      walletId,
      contractAddress,
      abiFunctionSignature: "mintTo(address,string)",
      abiParameters: [recipient, tokenURI],
      fee: {
        type: "level",
        config: { feeLevel: "MEDIUM" }
      }
    });

    return NextResponse.json({
      success: true,
      transactionId: result.data?.id
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message ?? "Mint failed" },
      { status: 500 }
    );
  }
}