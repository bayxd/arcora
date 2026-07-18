import ConnectWallet from "@/components/ConnectWallet";
import UnifiedBalanceCard from "@/components/portfolio/UnifiedBalanceCard";
import Footer from "@/components/dashboard/Footer";
import UnifiedBalanceHistory from "@/components/portfolio/UnifiedBalanceHistory";

export default function UnifiedBalancePage() {
  return (
    <main className="min-h-screen text-white">

      <ConnectWallet />

      <div className="max-w-[1000px] mx-auto px-8 xl:px-16 py-10 space-y-10">

        <section className="bg-zinc-900/70 border border-white/10 rounded-[40px] p-10 backdrop-blur-xl shadow-2xl">

          <h1
            className="
            text-6xl
            font-black
            bg-linear-to-r
            from-purple-400
            via-pink-500
            to-blue-500
            text-transparent
            bg-clip-text
            "
          >
            Unified Balance
          </h1>

          <p className="text-zinc-400 text-xl mt-5">
            Deposit USDC into your Unified Balance.
          </p>

        </section>

        <UnifiedBalanceCard/>

        <UnifiedBalanceHistory/>


      </div>

      <Footer />

    </main>
  );
}