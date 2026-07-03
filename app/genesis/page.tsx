import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/Footer";
import RequireGenesisPass from "@/components/RequireGenesisPass";
import GenesisPassCard from "@/components/GenesisPassCard";

export default function GenesisPage() {
  return (
    <main className="min-h-screen text-white">
      <ConnectWallet />

      <RequireGenesisPass>
        <div className="max-w-[1800px] mx-auto px-8 xl:px-16 py-25">
          <GenesisPassCard />
        </div>
      </RequireGenesisPass>

      <Footer />
    </main>
  );
}
