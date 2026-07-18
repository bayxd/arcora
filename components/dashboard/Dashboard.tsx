"use client";

import {
  useAccount,
} from "wagmi";

import {
  useEffect,
  useState
} from "react";

export default function Dashboard() {

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  const {
    address,
    isConnected
  } = useAccount();

  if (!mounted)
    return null;

  if (!isConnected)

    return (

      <div
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

        <h2
          className="
          text-4xl
          font-black
          "
        >
          ARCora
        </h2>

        <p
          className="
          text-zinc-400
          mt-4
          "
        >
          Connect your wallet to access Swap, NFTs and Portfolio.
        </p>

      </div>

    );

  return (

    <div
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

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <div>

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
            ARCora
          </h1>

        <p
          className="
          text-zinc-400
          text-lg
          mt-3
          "
        >
          Manage stablecoins, NFTs, and cross-chain assets with a seamless experience powered by Arc and Circle.
        </p>

        </div>

        <div
          className="
          text-green-400
          font-semibold
          "
        >
          Connected ✓
        </div>

      </div>

    </div>

  );

}