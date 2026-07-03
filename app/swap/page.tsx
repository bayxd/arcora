import RequireGenesisPass from "@/components/RequireGenesisPass";
import ConnectWallet from "@/components/ConnectWallet";
import SwapCard from "@/components/SwapCard";
import SwapHistory from "@/components/SwapHistory";
import Footer from "@/components/Footer";

export default function SwapPage() {

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