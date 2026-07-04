export interface PortfolioSnapshot {
  timestamp: number;
  usdcBalance: number;
  eurcBalance: number;
  // NOTE: EURC diperlakukan ~1:1 ke USD di sini untuk kesederhanaan.
  // Kalau kamu butuh akurasi valuasi USD yang benar (EUR/USD itu berfluktuasi,
  // tidak persis 1:1 kayak USDC), nanti tinggal tambah field `eurUsdRate` di sini
  // dan hitung totalValueUSD = usdcBalance + (eurcBalance * eurUsdRate).
  totalValueUSD: number;
}

const STORAGE_KEY = "arcora-portfolio-snapshots";

// Jarak minimum antar snapshot "pasif" (dari sekadar buka halaman), biar
// localStorage nggak kebanjiran entri kalau user buka halaman berkali-kali
// dalam waktu singkat. Di development sengaja dibikin pendek biar gampang
// ditest tanpa harus nunggu jam-jaman.
const MIN_INTERVAL_MS =
  process.env.NODE_ENV === "development"
    ? 10 * 1000 // 10 detik saat dev
    : 60 * 60 * 1000; // 1 jam saat production

// Batas jumlah snapshot yang disimpan (localStorage ada limit ukuran).
const MAX_SNAPSHOTS = 2000;

export function getSnapshots(): PortfolioSnapshot[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Catat saldo saat ini sebagai satu titik data historis.
 *
 * - Panggilan "pasif" (misal tiap kali halaman Portfolio dibuka, lewat
 *   usePortfolioHistorySnapshot()) tunduk ke MIN_INTERVAL_MS di atas.
 * - Panggilan "aktif" setelah transaksi sukses (swap/bridge/send) pakai
 *   { force: true } supaya selalu tercatat, karena momen itu memang titik
 *   data yang berharga (saldo beneran berubah), bukan cuma page-view biasa.
 */
export function recordSnapshot(
  usdcBalance: number,
  eurcBalance: number,
  options?: { force?: boolean }
) {
  if (typeof window === "undefined") return;

  const snapshots = getSnapshots();
  const now = Date.now();
  const last = snapshots[0];

  if (!options?.force && last && now - last.timestamp < MIN_INTERVAL_MS) {
    return;
  }

  const totalValueUSD = usdcBalance + eurcBalance;

  const updated = [
    { timestamp: now, usdcBalance, eurcBalance, totalValueUSD },
    ...snapshots,
  ].slice(0, MAX_SNAPSHOTS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Ambil snapshot dalam rentang waktu tertentu, urut dari paling lama ke
 * paling baru (cocok langsung buat dikasih ke recharts <LineChart data=.../>).
 */
export function getSnapshotsInRange(
  period: "1D" | "7D" | "30D" | "ALL"
): PortfolioSnapshot[] {
  const all = getSnapshots().slice().reverse(); // oldest -> newest

  if (period === "ALL") return all;

  const daysMap = { "1D": 1, "7D": 7, "30D": 30 };
  const cutoff = Date.now() - daysMap[period] * 24 * 60 * 60 * 1000;

  return all.filter((s) => s.timestamp >= cutoff);
}