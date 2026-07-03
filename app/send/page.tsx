import ConnectWallet from "@/components/ConnectWallet";
import SendCard from "@/components/SendCard";
import Footer from "@/components/Footer";
import RequireGenesisPass from "@/components/RequireGenesisPass";

export default function SendPage() {

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
          max-w-[1800px]
          mx-auto
          px-8
          xl:px-16
          py-25
          space-y-10
          "
        >


          {/* Send Card */}

          <section
            className="
            flex
            justify-center
            "
          >

            <SendCard />

          </section>

        </div>

      </RequireGenesisPass>

      <Footer />

    </main>

  );

}
