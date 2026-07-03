import ConnectWallet from "@/components/ConnectWallet";
import BridgeCard from "@/components/BridgeCard";
import BridgeHistory from "@/components/BridgeHistory";
import Footer from "@/components/Footer";
import RequireGenesisPass from "@/components/RequireGenesisPass";

export default function BridgePage() {

  return (

    <main
      className="
      min-h-screen
      text-white
      "
    >

      <ConnectWallet />

      <RequireGenesisPass>

        <div
          className="
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
