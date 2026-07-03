import ConnectWallet from "@/components/ConnectWallet";
import BridgeCard from "@/components/BridgeCard";
import BridgeHistory from "@/components/BridgeHistory";
import Footer from "@/components/Footer";
import RequireGenesisPass from "@/components/RequireGenesisPass";
import CyberpunkBackground from "@/components/CyberpunkBackground";

export default function BridgePage() {

  return (

    <main
      className="
      relative
      min-h-screen
      overflow-hidden
      text-white
      "
    >

      <CyberpunkBackground />

      <ConnectWallet />

      <RequireGenesisPass>

        <div
          className="
          relative
          z-10
          max-w-250
          mx-auto
          px-8
          xl:px-16
          py-25
          space-y-10
          "
        >

          <div
            className="
            max-w-250
            mx-auto
            space-y-10
            "
          >

            <BridgeCard />

            <BridgeHistory />

          </div>

        </div>

      </RequireGenesisPass>

      <Footer />

    </main>

  );

}