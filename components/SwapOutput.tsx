type Props = {
  amount?: string | number;
  tokenOut: string;
  balance: number;
  quoteAmount?: string | number;
};

export default function SwapOutput({
  amount,
  quoteAmount,
  tokenOut,
  balance
}: Props) {

  const displayAmount =
    quoteAmount !== undefined && quoteAmount !== null
      ? quoteAmount
      : amount;

  return (
    <div
      className="
        bg-zinc-800
        rounded-[28px]
        p-5
        hover:bg-zinc-800/80
        duration-300
      "
    >
      <div className="flex justify-between items-center">
        <p className="text-zinc-500 text-sm">
          You Receive
        </p>

        <p className="text-xs text-zinc-400">
          Balance: {balance.toFixed(4)} {tokenOut}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-4xl font-black">
          {displayAmount}
        </div>

        <div className="bg-zinc-700 rounded-full px-5 py-3 font-semibold">
          {tokenOut}
        </div>
      </div>
    </div>
  );
}