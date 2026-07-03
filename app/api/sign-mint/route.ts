import { NextResponse } from "next/server";
import { circleWallets } from "@/lib/circle";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing id" },
      { status: 400 }
    );
  }

  try {
    const tx = await circleWallets.getTransaction({ id });

    return NextResponse.json({
      success: true,
      state: tx.data?.transaction?.state,
      txHash: tx.data?.transaction?.txHash
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message ?? "Failed to check status" },
      { status: 500 }
    );
  }
}