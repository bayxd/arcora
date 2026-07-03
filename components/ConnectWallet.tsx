"use client";

import { useAppKit } from "@reown/appkit/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const appKit = useAppKit();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function navClass(href: string) {
    return `
      px-5 py-2 rounded-full duration-300
      ${
        pathname === href
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }
    `;
  }

  return (
    <header className="sticky top-5 z-50">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 shadow-[0_10px_50px_rgba(0,0,0,.4)] flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <svg
              width="42"
              height="42"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_8px_rgba(217,70,239,.4)]"
            >
              <defs>
                <linearGradient id="arcoraGradient" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="55%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>

              {/* Huruf A */}
              <path
                d="
                M32 8
                L10 48
                C8 52 10 56 15 56
                H22
                L32 38
                L42 56
                H49
                C54 56 56 52 54 48
                L32 8Z
                "
                fill="url(#arcoraGradient)"
              />

              {/* Lubang tengah */}
              <path
                d="
                M32 21
                L22 40
                H28
                L32 33
                L36 40
                H42
                L32 21Z
                "
                fill="#0B0B0F"
              />

              {/* Garis bawah */}
              <path
                d="
                M24 46
                L32 38
                L40 46
                "
                stroke="url(#arcoraGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-3xl font-black bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              ARCora
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <Link href="/swap" className={navClass("/swap")}>Swap</Link>
            <Link href="/bridge" className={navClass("/bridge")}>Bridge</Link>
            <Link href="/send" className={navClass("/send")}>Send</Link>
            <Link href="/nfts" className={navClass("/nfts")}>Mint Badge</Link>
            <Link href="/portfolio" className={navClass("/portfolio")}>Portfolio</Link>
            <Link href="/genesis" className={navClass("/genesis")}>My Genesis</Link>
          </nav>
          </div>

          {/* Right */}
          <div className="scale-105">
            <button
              onClick={() => appKit.open()}
              className="px-5 py-2 bg-purple-600 rounded-full text-white"
            >
              {isConnected && address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>

        </div>

        
      </div>
    </header>
  );
}
