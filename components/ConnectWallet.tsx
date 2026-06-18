"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ConnectWallet() {

  const [mounted, setMounted] =
    useState(false);

  const pathname =
    usePathname();

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted)
    return null;

  function navClass(
    href: string
  ) {

    return `

      px-5
      py-2
      rounded-full
      duration-300

      ${
        pathname === href

          ?

          "bg-zinc-800 text-white"

          :

          "text-zinc-400 hover:bg-zinc-800 hover:text-white"

      }

    `;

  }

  return (

    <header
      className="
      sticky
      top-5
      z-50
      "
    >

      <div
        className="
        max-w-[1800px]
        mx-auto
        px-6
        "
      >

        <div
          className="
          bg-zinc-900/60
          backdrop-blur-2xl
          border
          border-white/10
          rounded-full
          px-8
          py-4
          shadow-[0_10px_50px_rgba(0,0,0,.4)]
          flex
          items-center
          justify-between
          "
        >

          {/* Left */}

          <div
            className="
            flex
            items-center
            gap-12
            "
          >

            <Link
              href="/"
              className="
              text-3xl
              font-black
              bg-linear-to-r
              from-purple-400
              via-pink-500
              to-blue-500
              text-transparent
              bg-clip-text
              hover:scale-105
              duration-300
              "
            >
              ARCora
            </Link>

            <nav
              className="
              hidden
              lg:flex
              items-center
              gap-2
              "
            >

              <Link
                href="/"
                className={navClass("/")}
              >
                Dashboard
              </Link>

              <Link
                href="/nfts"
                className={navClass("/nfts")}
              >
                NFTs
              </Link>

              <Link
                href="/swap"
                className={navClass("/swap")}
              >
                Swap
              </Link>

              <Link
                href="/bridge"
                className={navClass("/bridge")}
              >
                Bridge
              </Link>

              <Link
                href="/portfolio"
                className={navClass("/portfolio")}
              >
                Portfolio
              </Link>

            </nav>

          </div>

          {/* Right */}

          <div
            className="
            scale-105
            "
          >

            <ConnectButton />

          </div>

        </div>

      </div>

    </header>

  );

}