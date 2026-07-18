import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/dashboard/Footer";
import PortfolioSummary from "@/components/portfolio/PortfolioSummary";
import PerformanceChart from "@/components/portfolio/PerformanceChart";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

export default function PortfolioPage() {

  return (

    <main
      className="
      relative
      min-h-screen
      overflow-hidden
      text-white
      flex
      flex-col
      "
    >

      <CyberpunkBackground />

      <ConnectWallet />

      <div className="flex-1 flex flex-col">

        <div
          className="
          relative
          z-10
          w-full
          max-w-[1800px]
          mx-auto
          px-8
          xl:px-16
          py-10
          space-y-10
          "
        >

          <PortfolioSummary />

          <PerformanceChart />

        </div>

      </div>

      <Footer />

    </main>

  );

}