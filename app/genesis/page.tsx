import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/Footer";
import RequireGenesisPass from "@/components/RequireGenesisPass";
import GenesisPassCard from "@/components/GenesisPassCard";
import CyberpunkBackground from "@/components/CyberpunkBackground";

export default function GenesisPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <CyberpunkBackground />

      <ConnectWallet />

      <RequireGenesisPass>
        <div className="relative z-10 max-w-[1800px] mx-auto px-8 xl:px-16 py-25">
          <GenesisPassCard />
        </div>
      </RequireGenesisPass>

      <Footer />
    </main>
  );
}