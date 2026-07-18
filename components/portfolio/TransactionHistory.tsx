"use client";

export default function TransactionHistory() {
  // 1. Menambahkan 'id' unik untuk setiap item agar aman digunakan sebagai 'key' di React
  const transactions = [
    {
      id: "tx-1",
      type: "Swap",
      detail: "1 USDC → EURC",
      date: "Today",
    },
    {
      id: "tx-2",
      type: "Mint",
      detail: "Genesis NFT #7",
      date: "Yesterday",
    },
    {
      id: "tx-3",
      type: "Swap",
      detail: "10 EURC → USDC",
      date: "2 days ago",
    },
  ];

  return (
    <section className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 text-white">
        Transaction History
      </h2>

      {/* 2. Menggunakan <ul> (unordered list) agar HTML lebih semantik */}
      <ul className="space-y-5">
        {transactions.map((item) => (
          <li
            key={item.id}
            className="bg-zinc-800 rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white">
                {item.type}
              </div>
              <div className="text-zinc-400 mt-1">
                {item.detail}
              </div>
            </div>

            <div className="text-zinc-500 text-sm">
              {item.date}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}