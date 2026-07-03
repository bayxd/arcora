type Props = {

  quote: any;

  tokenIn: string;

  tokenOut: string;

  slippage: string;

};

export default function SwapInfo({

  quote,

  tokenIn,

  tokenOut,

  slippage

}: Props) {

  return (

  <div
  className="
  mt-4
  rounded-2xl
  bg-zinc-900/50
  border
  border-white/5
  p-4
  space-y-4
  "
  >

  <div className="flex justify-between">

  <span className="text-zinc-400">

  Estimated Receive

  </span>

  <span className="font-semibold text-emerald-400">

  {quote?.estimatedOutput?.amount ?? "-"}

  {" "}

  {quote?.estimatedOutput?.token ?? tokenOut}

  </span>

  </div>

  <div className="flex justify-between">

  <span className="text-zinc-400">

  Minimum Receive

  </span>

  <span>

  {quote?.stopLimit?.amount ?? "-"}

  {" "}

  {quote?.stopLimit?.token ?? tokenOut}

  </span>

  </div>

  <div className="border-t border-white/5"></div>

  {

  quote?.fees?.map(

  (fee:any)=>(

  <div

  key={fee.type}

  className="flex justify-between"

  >

  <span className="text-zinc-400">

  {

  fee.type==="provider"

  ?

  "Provider Fee"

  :

  "Gas Fee"

  }

  </span>

  <span>

  {fee.amount}

  {" "}

  {fee.token}

  </span>

  </div>

  )

  )

  }

  <div className="border-t border-white/5"></div>

  <div className="flex justify-between">

  <span className="text-zinc-400">

  Slippage

  </span>

  <span>

  {slippage}%

  </span>

  </div>

  <div className="flex justify-between">

  <span className="text-zinc-400">

  Network

  </span>

  <span>

  Arc Testnet

  </span>

  </div>

  </div>

  );

}