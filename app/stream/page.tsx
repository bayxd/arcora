import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/dashboard/Footer";
import RequireGenesisPass from "@/components/nft/RequireGenesisPass";
import StreamCard from "@/components/stream/StreamCard";
import ActiveStreams from "@/components/stream/ActiveStreams";

export default function StreamPage() {
  return (
    <main className="min-h-screen text-white">

      <ConnectWallet />

      <RequireGenesisPass>

        {/* Hero */}
        <section className="relative flex flex-col items-center text-center px-6 pt-16 pb-10 overflow-hidden">

          {/* subtle grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(168,85,247,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.35) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 100%)",
            }}
          />

          <div className="relative z-10 mb-6 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-zinc-900/60 backdrop-blur px-4 py-1.5 shadow-[0_0_16px_rgba(52,211,153,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              Arc Testnet · Streaming Live
            </span>
          </div>

          <h1 className="relative z-10 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Pay by the{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Second.
            </span>
            <br />
            Not by the Month.
          </h1>

          <p className="relative z-10 mt-5 text-zinc-400 text-sm max-w-lg">
            Real-time USDC payment streams for payroll, freelancer payouts, and
            pay-per-use settled instantly on Arc Testnet.
          </p>

          <div className="relative z-10 mt-5 flex items-center gap-2 rounded-full border border-purple-500/20 bg-zinc-900/60 backdrop-blur px-4 py-1.5 text-[11px] font-mono text-zinc-400">
            <span>🔓</span>
            Genesis Pass detected - stream fees reduced 50%
          </div>

        </section>

        <div
          className="
          max-w-5xl
          mx-auto
          px-6
          xl:px-0
          pb-16
          space-y-8
          "
        >

          <StreamCard />

          <ActiveStreams />

        </div>

      </RequireGenesisPass>

      <Footer />

    </main>
  );
}