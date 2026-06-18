import ConnectWallet from "@/components/ConnectWallet";
import Dashboard from "@/components/Dashboard";
import NFTCard from "@/components/NFTCard";
import NFTInfo from "@/components/NFTInfo";
import MyNFTs from "@/components/MyNFTs";
import DashboardStats from "@/components/DashboardStats";
import Footer from "@/components/Footer";
import MarketOverview from "@/components/MarketOverview";

export default function Home() {

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
        space-y-10
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
            text-6xl
            xl:text-7xl
            font-black
            bg-linear-to-r
            from-purple-400
            via-pink-500
            to-blue-500
            text-transparent
            bg-clip-text
            "
          >
            Own. Swap. Explore.
          </h1>

          <p
            className="
            text-zinc-400
            text-xl
            mt-5
            "
          >
            Swap • NFTs • Portfolio • Arc Testnet
          </p>

        </section>


        {/* Dashboard */}

        <Dashboard />

        <DashboardStats />

        <MarketOverview />


        {/* Wallet */}

        <section
          className="
          grid
          xl:grid-cols-2
          gap-8
          "
        >

        </section>


        {/* NFT Overview */}

        <section
          className="
          grid
          xl:grid-cols-2
          gap-8
          "
        >

          <NFTInfo />

          <NFTCard />

        </section>


        {/* My NFTs */}

        <MyNFTs />


        {/* EURC Balance */}

        <div
          className="
          max-w-5xl
          mx-auto
          "
        >


        </div>


        {/* Activity */}

        <section
          className="
          grid
          xl:grid-cols-2
          gap-8
          items-start
          "
        >

        </section>

      </div>

      <Footer />

    </main>

  );

}