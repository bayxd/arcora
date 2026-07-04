"use client";

import { useEffect, useState } from "react";

import { useBalances } from "@/hooks/useBalances";
import {
  recordSnapshot,
  getSnapshotsInRange,
  PortfolioSnapshot,
} from "@/lib/history/portfolioSnapshot";

/**
 * Panggil hook ini SEKALI di halaman Portfolio (misal di parent component yang
 * merender <PortfolioAllocation /> dan <PerformanceChart />). Tugasnya cuma
 * mencatat saldo saat ini sebagai snapshot setiap kali halaman dibuka
 * (dibatasi 1x/jam oleh recordSnapshot, lihat lib/history/portfolioSnapshot.ts).
 */
export function usePortfolioHistorySnapshot() {
  const { usdcBalance, eurcBalance } = useBalances();

  useEffect(() => {
    // NOTE: sesuaikan pengambilan angkanya dengan bentuk asli yang dikembalikan
    // useTokenBalance/useBalances kamu — di sini diasumsikan usdcBalance dan
    // eurcBalance sudah berupa number (atau punya field seperti `.formatted`
    // / `.value`). Kalau ternyata objeknya berbeda, tinggal sesuaikan baris ini.
    const usdc = Number(usdcBalance ?? 0);
    const eurc = Number(eurcBalance ?? 0);

    // Jangan simpan snapshot kosong/loading (0 karena belum ke-fetch, bukan
    // karena saldo beneran 0) — cegah data historis yang menyesatkan.
    if (usdcBalance === undefined || eurcBalance === undefined) return;

    recordSnapshot(usdc, eurc);
  }, [usdcBalance, eurcBalance]);
}

export function usePortfolioHistory(
  period: "1D" | "7D" | "30D" | "ALL"
): PortfolioSnapshot[] {
  // IMPORTANT: initial state must be [] on both server AND the client's first
  // render pass, so hydration has something to match. Reading localStorage
  // directly in the function body (like before) returns different data on
  // the client's first render than what the server produced -> hydration
  // mismatch. Reading it inside useEffect defers it until after mount/hydration,
  // then triggers a normal client-side re-render with the real data.
  const [snapshots, setSnapshots] = useState<PortfolioSnapshot[]>([]);

  useEffect(() => {
    setSnapshots(getSnapshotsInRange(period));
  }, [period]);

  return snapshots;
}