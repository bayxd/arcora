import ConnectWallet from "@/components/ConnectWallet";
import PortfolioAllocation from "@/components/PortfolioAllocation";
import Footer from "@/components/Footer";
import AssetBreakdown from "@/components/AssetBreakdown";
import PerformanceChart from "@/components/PerformanceChart";
import TransactionHistory from "@/components/TransactionHistory";
import DashboardStats from "@/components/DashboardStats";

export default function PortfolioPage() {

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

        <DashboardStats />

        <AssetBreakdown />

        <PerformanceChart />

        <PortfolioAllocation />

    
      </div>

      <Footer />

    </main>

  );

}