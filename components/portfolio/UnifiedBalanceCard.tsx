"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUnifiedBalance } from "@/hooks/portfolio/useUnifiedBalance";


export default function UnifiedBalanceCard() {

  const [amount, setAmount] =
  useState("1");

  const [loading, setLoading] =
  useState(false);

  const [balance, setBalance] =
  useState<any>(null);

  const [estimateResult, setEstimateResult] =
  useState<any>(null);

  const [spendResult, setSpendResult] =
  useState<any>(null);

    const {

    deposit,

    getBalances,

    estimateSpend,
    
    spend

    }= useUnifiedBalance();

  async function handleDeposit() {

    try {

      setLoading(true);

      const data =
        await deposit(amount);

      console.log(data);

      if (data.success) {

        await refreshBalance();

        toast.success(
          "Deposit Success"
        );

      }
      else {

        toast.error(
          data.message
        );

      }

    }

    catch (error: any) {

      console.error(error);

      toast.error(

        error?.message ??

        "Deposit failed"

      );

    }

    finally {

      setLoading(false);

    }

  }

    async function handleGetBalances() {

    try {

        setLoading(true);

        const data =
        await getBalances();

        console.log(data);

        if (

            data.success &&

            data.balances

        ) {

            setBalance(

                data.balances

            );

            toast.success(

                "Unified Balance Loaded"

            );

        }

        else {

        toast.error(

            data.message ??

            "Failed to load balance"

        );

        }

    }

    catch (error: any) {

        console.error(error);

        toast.error(

        error?.message ??

        "Failed to load balance"

        );

    }

    finally {

        setLoading(false);

    }

    }

  async function refreshBalance() {

    const data = await getBalances();

    if (

      data.success &&

      data.balances

    ) {

      setBalance(

        data.balances

      );

    }

  }

  async function handleEstimateSpend() {

  try {

    setLoading(true);

    const data =

      await estimateSpend(

        amount

      );

    console.log(data);

    if (

        data.success

    ) {

        setEstimateResult(

            data.estimate

        );

        toast.success(

            "Estimate Success"

        );

    }

    else {

      toast.error(

        data.message

      );

    }

  }

    catch (error: any) {

    console.error(error);

    toast.error(

        error?.message ??

        "Estimate failed"

    );

    }

  finally {

    setLoading(false);

  }

}

  async function handleSpend() {

  try {

    setLoading(true);

    const data =

      await spend(amount);

    console.log(data);

      if (

        data.success

      ) {

        setSpendResult(

          data.result

        );

        await refreshBalance();

        toast.success(

          "Spend Success"

        );

      }

    else {

      toast.error(

        data.message

      );

    }

  }

  catch (error: any) {

    console.error(error);

    toast.error(

      error?.message ??

      "Spend failed"

    );

  }

  finally {

    setLoading(false);

  }

}
  useEffect(() => {

   refreshBalance();

  }, []);

  return (

    <section
      className="
      bg-zinc-900/70
      backdrop-blur-xl
      border
      border-white/10
      rounded-4xl
      p-8
      shadow-2xl
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Unified Balance
      </h2>

      {loading && (

      <div

      className="
      mb-6
      rounded-2xl
      bg-zinc-800
      p-4
      text-center
      text-zinc-400
      animate-pulse
      "

      >

      Loading Unified Balance...

      </div>

      )}

      <div
        className="
        bg-zinc-800
        rounded-3xl
        p-6
        "
      >

        <p
          className="
          text-zinc-500
          text-sm
          mb-4
          "
        >
          Deposit Amount (USDC)
        </p>

        <input

          type="number"

          value={amount}

          onChange={(e) =>

            setAmount(
              e.target.value
            )

          }

          className="
          w-full
          bg-transparent
          outline-none
          text-4xl
          font-bold
          "

        />

      </div>

      <div
        className="
        mt-6
        text-zinc-400
        "
      >

        Source Chain:

        <span
          className="
          ml-2
          font-semibold
          text-white
          "
        >
          Base Sepolia
        </span>

      </div>

      <button

        onClick={handleDeposit}

        disabled={loading}

        className="
        w-full
        mt-8
        py-4
        rounded-full
        text-lg
        font-bold
        bg-linear-to-r
        from-purple-600
        via-pink-500
        to-blue-500
        hover:scale-[1.02]
        duration-300
        disabled:opacity-50
        "

      >

        {

          loading

            ?

            "Depositing..."

            :

            "Deposit to Unified Balance"

        }

      </button>

      <button

        onClick={handleGetBalances}

        disabled={loading}

        className="
        w-full
        mt-4
        py-4
        rounded-full
        text-lg
        font-bold
        bg-zinc-700
        hover:bg-zinc-600
        duration-300
        disabled:opacity-50
        "

      >

        Check Unified Balance

      </button>

      <button

        onClick={handleEstimateSpend}

        disabled={loading}

        className="
        w-full
        mt-4
        py-4
        rounded-full
        text-lg
        font-bold
        bg-emerald-600
        hover:bg-emerald-500
        duration-300
        disabled:opacity-50
        "

      >

        Estimate Spend

      </button>

      <button

        onClick={handleSpend}

        disabled={loading}

        className="
        w-full
        mt-4
        py-4
        rounded-full
        text-lg
        font-bold
        bg-blue-600
        hover:bg-blue-500
        duration-300
        disabled:opacity-50
        "

      >

        Spend to Arc

      </button>

      {balance && (

        <div

        className="

        mt-8

        rounded-3xl

        bg-zinc-800

        p-6

        "

        >

        <h3

        className="

        font-bold

        text-xl

        mb-4

        "

        >

        Unified Balance

        </h3>

        <div className="flex justify-between">

        <span>

        Confirmed

        </span>

        <span className="font-bold">

        {

        balance.totalConfirmedBalance

        }

        USDC

        </span>

        </div>

        <div

        className="

        flex

        justify-between

        mt-3

        "

        >

        <span>

        Pending

        </span>

        <span className="font-bold">

        {

        balance.totalPendingBalance

        }

        USDC

        </span>

        </div>

        </div>

        )}


      {estimateResult && (

      <div
        className="
        mt-6
        rounded-3xl
        bg-zinc-800
        p-6
        "
      >

        <h3
          className="
          font-bold
          text-xl
          mb-4
          "
        >
          Estimate
        </h3>

        <pre
          className="
          text-xs
          overflow-auto
          "
        >
          {JSON.stringify(estimateResult, null, 2)}
        </pre>

      </div>

    )}

    {spendResult && (

    <div

    className="
    mt-6
    rounded-3xl
    bg-zinc-800
    p-6
    "

    >

    <h3>

    Last Spend

    </h3>

    <p>

    Destination

    </p>

    <p>

    {spendResult.destinationChain}

    </p>

    <p>

    Recipient

    </p>

    <p>

    {spendResult.recipientAddress}

    </p>

    <p>

    Tx Hash

    </p>

    <p>

    {spendResult.txHash}

    </p>

    <a

    href={spendResult.explorerUrl}

    target="_blank"

    >

    View on ArcScan

    </a>

    </div>

    )}


    </section>

  );

}