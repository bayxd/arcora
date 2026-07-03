export async function estimateSwap(

  amount: string,

  tokenIn: string,

  tokenOut: string,

  slippage: string

) {

  const amountOut =
    Number(amount);

  const fee =
    amountOut * 0.001;

  const minimumReceived =
    amountOut -
    (
      amountOut *
      Number(slippage)
      /
      100
    );

  return {

    amountOut:
      amountOut.toFixed(6),

    fee:
      fee.toFixed(6),

    minimumReceived:
      minimumReceived.toFixed(6),

    priceImpact:
      "0.01"

  };

}