import ConnectWallet from "@/components/ConnectWallet";
import NFTInfo from "@/components/nft/NFTInfo";
import MyNFTs from "@/components/nft/MyNFTs";
import Footer from "@/components/dashboard/Footer";

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
        py-25
        space-y-16
        "
      >

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