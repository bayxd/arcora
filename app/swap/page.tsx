import RequireGenesisPass from "@/components/RequireGenesisPass";
import ConnectWallet from "@/components/ConnectWallet";
import SwapCard from "@/components/SwapCard";
import SwapHistory from "@/components/SwapHistory";
import Footer from "@/components/Footer";
import CyberpunkBackground from "@/components/CyberpunkBackground";

export default function SwapPage() {

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
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >

        {/* Swap Card */}

<section
  className="
  max-w-4xl
  mx-auto
  mt-10
  "
>

  <SwapCard />

</section>


        {/* History + Activity */}

        <section
          className="
          max-w-4xl
          mx-auto
          mt-20
          space-y-8
          "
        >
          
          
          <SwapHistory />



        </section>

      </div>

      </RequireGenesisPass>

      <Footer />

    </main>

  );

}