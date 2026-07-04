import Link from "next/link";

export default function Footer() {

  return (

    <footer
      className="
      relative
      mt-20
      border-t
      border-white/5
      py-10
      text-zinc-400
      overflow-hidden
      "
    >

      {/* neon top strip */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-purple-600/60 via-pink-500/60 to-blue-500/60" />

      <div
        className="
        relative
        max-w-[1800px]
        mx-auto
        px-10
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
        "
      >

        <div>

          <Link href="/" className="flex items-center gap-2 justify-center md:justify-start">
            <svg
              width="22"
              height="22"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="footerArcoraGradient" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="55%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
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
                fill="url(#footerArcoraGradient)"
              />
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
            </svg>

            <h3 className="text-lg font-black bg-linear-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
              ARCora
            </h3>
          </Link>

          <p className="mt-3 text-sm font-mono text-zinc-500">
            Swap. Bridge. Hire. Anywhere.
          </p>

          <p className="mt-2 text-[11px] font-mono text-zinc-600">
            © 2026 ARCora · Built with Next.js and Circle
          </p>

        </div>


        <div className="flex items-center gap-6">

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600 mr-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Arc Testnet
          </div>

          <a
            href="https://github.com/Arcticoz/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-purple-400 duration-300"
          >
            GitHub
          </a>

          <a
            href="https://x.com/forbyuu"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-pink-400 duration-300"
          >
            X
          </a>

        </div>

      </div>

    </footer>

  );

}