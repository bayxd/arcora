"use client";

import {

getHistory

}

from

"@/lib/history/unifiedBalanceHistory";

export default function UnifiedBalanceHistory(){

const history=

getHistory();

return(

<div

className="

mt-8

rounded-3xl

bg-zinc-900

p-6

"

>

<h2

className="

text-xl

font-bold

mb-6

"

>

Latest Activity

</h2>

{

history.length===0

&&

(

<p>

No activity

</p>

)

}

{

history.map(

(item:any,index:number)=>(

<div

key={index}

className="

border-b

border-zinc-700

py-4

"

>

<div

className="

flex

justify-between

"

>

<strong>

{

item.type

}

</strong>

<span>

{

item.amount

}

USDC

</span>

</div>

<p>

{

item.chain

}

</p>

{

item.explorerUrl

&&

(

<a

href={

item.explorerUrl

}

target="_blank"

className="

text-blue-400

"

>

View Transaction

</a>

)

}

</div>

)

)

}

</div>

);

}