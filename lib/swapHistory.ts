export function saveSwapHistory(

  amount: string,

  tokenIn: string,

  tokenOut: string,

  explorerUrl?: string,

  txHash?: string

) {

  const history =

    JSON.parse(

      localStorage.getItem(

        "swapHistory"

      ) ?? "[]"

    );

  history.unshift({
    amount,
    tokenIn,
    tokenOut,
    date: new Date().toLocaleString(),
    explorerUrl,
    txHash
  });

  const trimmed = history.slice(0, 20);

  localStorage.setItem(
    "swapHistory",
    JSON.stringify(trimmed)
  );

}