"use client";

import { useAppKit } from "@reown/appkit/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

const NAV_ITEMS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/agents", label: "AGENTS" },
  { href: "/swap", label: "Swap" },
  { href: "/bridge", label: "Bridge" },
  { href: "/send", label: "Send" },
  { href: "/genesis", label: "My Genesis" },
];

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const appKit = useAppKit();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-5 z-50">
      <div className="max-w-[1800px] mx-auto px-6">
        <div
          className="
          relative
          bg-zinc-900/60
          backdrop-blur-2xl
          rounded-full
          px-6
          py-3
          shadow-[0_10px_50px_rgba(0,0,0,.4),0_0_40px_rgba(168,85,247,0.06)]
          flex
          items-center
          justify-between
          "
        >

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <svg
              width="34"
              height="34"
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

            <span className="text-2xl font-black bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
              ARCora
            </span>
          </Link>

          {/* Nav — centered */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3.5 py-2 text-xs font-mono uppercase tracking-widest duration-300
                    ${
                      active
                        ? "text-white"
                        : "text-zinc-500 hover:text-zinc-200"
                    }
                  `}
                >
                  {item.label}

                  {active && (
                    <span
                      className="
                      absolute
                      left-1/2
                      -translate-x-1/2
                      -bottom-0.5
                      h-0.5
                      w-5
                      rounded-full
                      bg-linear-to-r
                      from-purple-400
                      via-pink-400
                      to-blue-400
                      shadow-[0_0_6px_rgba(168,85,247,0.6)]
                      "
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Connect Wallet */}
          <button
            onClick={() => appKit.open()}
            className="
            relative
            overflow-hidden
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            font-mono
            bg-linear-to-r
            from-purple-600
            via-pink-500
            to-blue-500
            shadow-[0_0_16px_rgba(168,85,247,0.3)]
            hover:shadow-[0_0_22px_rgba(168,85,247,0.45)]
            hover:scale-[1.02]
            duration-300
            flex
            items-center
            gap-2
            shrink-0
            "
          >
            {isConnected && address && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
            )}
            {isConnected && address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Connect Wallet"}
          </button>

        </div>

        
      </div>
    </header>
  );
}