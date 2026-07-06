import { NextRequest } from "next/server";

// Proxies to Circle's public Testnet Faucet API so the secret API key never
// reaches the browser. Same pattern as /api/mint used by RequireGenesisPass.
//
// Requires CIRCLE_FAUCET_API_KEY in your .env — a "TEST_API_KEY:..." style
// key from your Circle Developer Console (console.circle.com). If your app
// already has a Circle API key configured for another feature, you can
// likely reuse it here instead of creating a new one.
//
// NOTE: the exact `blockchain` identifier Circle expects for Arc Testnet
// wasn't confirmed against official docs in this pass (community examples
// use "ARC-TESTNET"). If drips fail with an "invalid blockchain" style
// error, check console.circle.com or Circle's faucet docs for the exact
// string and adjust ARC_TESTNET_CHAIN_ID below.
const ARC_TESTNET_CHAIN_ID = "ARC-TESTNET";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const address = body.address;

    if (!address) {
      return Response.json(
        { success: false, message: "Wallet address wajib diisi" },
        { status: 400 }
      );
    }

    if (!process.env.CIRCLE_FAUCET_API_KEY) {
      return Response.json(
        { success: false, message: "CIRCLE_FAUCET_API_KEY tidak ditemukan di server" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.circle.com/v1/faucet/drips", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CIRCLE_FAUCET_API_KEY}`,
      },
      body: JSON.stringify({
        address,
        blockchain: ARC_TESTNET_CHAIN_ID,
        native: false, // Arc uses USDC itself as gas, so no separate native token needed
        usdc: body.usdc ?? true,
        eurc: body.eurc ?? true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Circle's faucet returns rate-limit / validation errors here (e.g.
      // "Limit Exceeded" if this address already claimed recently).
      console.error("Faucet drip failed:", data);
      return Response.json(
        {
          success: false,
          message:
            data?.message ??
            "Faucet request failed — you may have hit the rate limit (Circle allows a limited amount per address every couple hours).",
        },
        { status: response.status }
      );
    }

    return Response.json({ success: true, result: data });
  } catch (error: any) {
    console.error("Faucet route error:", error);
    return Response.json(
      { success: false, message: error?.message ?? "Faucet request failed" },
      { status: 500 }
    );
  }
}