import ConnectWallet from "@/components/ConnectWallet";
import NFTInfo from "@/components/NFTInfo";
import MyNFTs from "@/components/MyNFTs";
import Footer from "@/components/Footer";

export default function NFTsPage() {

  return (

    <main
      className="
      min-h-screen
      text-white
      "
    >

      <ConnectWallet />

      <div
        className="
        max-w-[1800px]
        mx-auto
        px-8
        xl:px-16
        py-10
        space-y-16
        "
      >

        {/* Hero */}

        <section
          className="
          bg-zinc-900/70
          border
          border-white/10
          rounded-[40px]
          p-10
          backdrop-blur-xl
          shadow-2xl
          "
        >

          <h1
            className="
            text-5xl
            font-black
            bg-linear-to-r
            from-purple-400
            via-pink-500
            to-blue-500
            text-transparent
            bg-clip-text
            "
          >
            ARCora Early Access Badge
          </h1>

          <p
            className="
            text-zinc-400
            text-xl
            mt-5
            "
          >
            Mint and manage your Genesis Collection.
          </p>

        </section>


        {/* NFT Collection */}

        <section
          className="
          flex
          justify-center
          "
        >

          <NFTInfo />

        </section>


        {/* Owned NFTs */}

        <MyNFTs />

      </div>

      <Footer />

    </main>

  );

}