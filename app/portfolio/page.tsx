import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/Footer";
import AssetBreakdown from "@/components/AssetBreakdown";
import PerformanceChart from "@/components/PerformanceChart";
import DashboardStats from "@/components/DashboardStats";
import CyberpunkBackground from "@/components/CyberpunkBackground";

export default function PortfolioPage() {

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

      <div
        className="
        relative
        z-10
        max-w-[1800px]
        mx-auto
        px-8
        xl:px-16
        py-10
        space-y-10
        "
      >

        <DashboardStats />

        <AssetBreakdown />

        <PerformanceChart />


    
      </div>

      <Footer />

    </main>

  );

}