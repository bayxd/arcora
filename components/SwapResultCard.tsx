type Props = {

  result: any;

};

export default function SwapResultCard({

  result

}: Props) {

  if (!result) return null;

  const txHash =
    result?.result?.txHash;

  return (

    <div
      className="
      mt-5
      rounded-2xl
      border
      border-emerald-500/20
      bg-emerald-500/5
      p-5
      "
    >

      <div
        className="
        flex
        items-center
        justify-between
        "
      >

        <h3
          className="
          text-emerald-400
          font-bold
          "
        >
          ✅ Swap Completed
        </h3>

        <span
          className="
          text-xs
          rounded-full
          bg-emerald-500/20
          px-3
          py-1
          text-emerald-400
          "
        >
          {result?.status?.progress?.status}
        </span>

      </div>

      <div
        className="
        mt-5
        space-y-3
        text-sm
        "
      >

        <div className="flex justify-between">

          <span className="text-zinc-400">

            Received

          </span>

          <span className="font-semibold">

            {result?.result?.amountOut}{" "}

            {result?.result?.tokenOut}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-400">

            Transaction

          </span>

          <span
            className="
            font-mono
            text-xs
            "
          >

            {txHash?.slice(0,8)}

            ...

            {txHash?.slice(-6)}

          </span>

        </div>

      </div>

      <a

        href={result?.result?.explorerUrl}

        target="_blank"

        rel="noreferrer"

        className="
        mt-5
        block
        rounded-xl
        bg-zinc-800
        py-3
        text-center
        font-semibold
        hover:bg-zinc-700
        duration-300
        "

      >

        View on ArcScan ↗

      </a>

    </div>

  );

}