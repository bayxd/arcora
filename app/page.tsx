"use client";

import ConnectWallet from "@/components/ConnectWallet";
import Footer from "@/components/Footer";
import { useAppKit } from "@reown/appkit/react";

export default function Page() {
  const appKit = useAppKit();

  return (
    <main className="min-h-screen text-white">

      <ConnectWallet />


    {/* Center Animation */}
    <section className="flex items-center justify-center min-h-[70vh] relative">
      
      {/* glow background lebih besar */}
      <div className="absolute w-125 h-125 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute w-87.5 h-87.5 bg-pink-500/20 blur-[100px] rounded-full animate-ping" />

      {/* orb utama diperbesar */}
      <div className="relative w-40 h-40 rounded-full bg-linear-to-tr from-purple-500 via-pink-500 to-blue-500 animate-spin-slow shadow-2xl" />

    </section>

      <Footer />

    </main>
  );
}