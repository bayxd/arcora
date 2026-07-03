// scripts/register-secret.ts
// Jalankan SEKALI SAJA untuk mendaftarkan entity secret kamu ke akun Circle.
import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Mencari file env di:", envPath);

const result = config({ path: envPath });
if (result.error) {
  console.error("Gagal load .env.local:", result.error.message);
} else {
  console.log("Berhasil load .env.local, jumlah variable:", Object.keys(result.parsed ?? {}).length);
}

import { registerEntitySecretCiphertext } from "@circle-fin/developer-controlled-wallets";

const API_KEY = process.env.CIRCLE_API_KEY!;
const ENTITY_SECRET = process.env.CIRCLE_ENTITY_SECRET!;

async function main() {
  if (!API_KEY || !ENTITY_SECRET) {
    throw new Error(
      "CIRCLE_API_KEY atau CIRCLE_ENTITY_SECRET tidak ditemukan di .env / .env.local"
    );
  }

  const response = await registerEntitySecretCiphertext({
    apiKey: API_KEY,
    entitySecret: ENTITY_SECRET,
  });

  console.log("\n=== REGISTRASI BERHASIL ===");
  console.log("Recovery file otomatis tersimpan di folder ini (recovery_file_<timestamp>.dat)");
  console.log("SIMPAN FILE INI BAIK-BAIK — ini satu-satunya cara recovery kalau secret hilang.");
  console.log(response.data?.recoveryFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
