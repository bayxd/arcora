export async function getSwapQuote(

  amount: string,

  tokenIn: string,

  tokenOut: string,

  slippage: string

) {

  const amountOut =
    amount;

  const fee =
    "0";

  const minimumReceived =
    (
      Number(amount)
      *
      (
        1 -
        Number(slippage)
        / 100
      )
    )
      .toFixed(6);

  const priceImpact =
    "0";

  return {

    amountIn:
      amount,

    amountOut,

    tokenIn,

    tokenOut,

    fee,

    minimumReceived,

    priceImpact

  };

}