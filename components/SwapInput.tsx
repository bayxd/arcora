import TokenSelector from "./TokenSelector";

type Props = {

  amount: string;

  setAmount:
    (
      value: string
    ) => void;

  tokenIn: string;

  setTokenIn:
    (
      value: string
    ) => void;

  balance: number;

};

export default function SwapInput({

  amount,

  setAmount,

  tokenIn,

  setTokenIn,

  balance

}: Props) {

  return (

    <div
      className="
      bg-zinc-800/80
      border
      border-white/5
      rounded-2xl
      p-4
      hover:border-purple-500/30
      hover:bg-zinc-800
      duration-300
      "
    >

      <div
        className="
        flex
        justify-between
        items-center
        "
      >

        <p
          className="
          text-[10px]
          tracking-widest
          uppercase
          text-zinc-500
          font-semibold
          "
        >
          You Pay
        </p>

        <p
          className="
          text-[11px]
          font-mono
          text-zinc-500
          "
        >
          Bal <span className="text-zinc-300">{balance.toFixed(4)}</span> {tokenIn}
        </p>

      </div>

      <div
        className="
        flex
        items-center
        justify-between
        mt-2.5
        "
      >

        <input

          type="number"

          value={amount}

          onChange={(e) =>

            setAmount(
              e.target.value
            )

          }

          className="
          bg-transparent
          outline-none
          text-3xl
          font-bold
          font-mono
          tabular-nums
          w-32
          "

        />

        <TokenSelector value={tokenIn} onChange={setTokenIn} />

      </div>

    </div>

  );

}