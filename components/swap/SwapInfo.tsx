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
  mt-3
  rounded-xl
  bg-zinc-900/50
  border
  border-white/5
  p-3.5
  space-y-2.5
  text-xs
  "
  >

  <div className="flex justify-between">

  <span className="text-zinc-500">

  Est. Receive

  </span>

  <span className="font-mono font-semibold text-emerald-400">

  {quote?.estimatedOutput?.amount ?? "-"}

  {" "}

  {quote?.estimatedOutput?.token ?? tokenOut}

  </span>

  </div>

  <div className="flex justify-between">

  <span className="text-zinc-500">

  Min. Receive

  </span>

  <span className="font-mono text-zinc-300">

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

  <span className="text-zinc-500">

  {

  fee.type==="provider"

  ?

  "Provider Fee"

  :

  "Gas Fee"

  }

  </span>

  <span className="font-mono text-zinc-300">

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

  <span className="text-zinc-500">

  Slippage

  </span>

  <span className="font-mono">

  {slippage}%

  </span>

  </div>

  <div className="flex justify-between">

  <span className="text-zinc-500">

  Network

  </span>

  <span className="text-purple-400 font-medium">

  Arc Testnet

  </span>

  </div>

  </div>

  );

}