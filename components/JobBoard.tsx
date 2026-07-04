"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

import { useJobBoard, useJob, useMyJobIds } from "@/hooks/useJobBoard";
import { useAccess } from "@/context/AccessContext";

const STATUS_LABEL = ["Created", "Funded 🔒", "Submitted", "Completed ✅"];

function JobRow({ jobId }: { jobId: bigint }) {
  const { job, refetch } = useJob(jobId);
  const { fundJob, setBudgetWithRetry, submitDeliverable, completeJob, status } = useJobBoard();
  const { address } = useAccount();
  const [retryAmount, setRetryAmount] = useState("");

  if (!job) return null;

  const { client, provider, description, budget, status: jobStatus } = job as {
    id: bigint;
    client: `0x${string}`;
    provider: `0x${string}`;
    evaluator: `0x${string}`;
    description: string;
    budget: bigint;
    expiredAt: bigint;
    status: number;
    hook: `0x${string}`;
  };

  const isClient = address?.toLowerCase() === client.toLowerCase();
  const isProvider = address?.toLowerCase() === provider.toLowerCase();

  return (
    <div className="rounded-2xl bg-zinc-800/60 border border-white/5 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{description}</p>
        <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/15 border border-purple-500/30 rounded-full px-2.5 py-1">
          {STATUS_LABEL[jobStatus]}
        </span>
      </div>

      <p className="text-xs text-zinc-500 font-mono">
        {(Number(budget) / 1e6).toFixed(2)} USDC · Order #{jobId.toString()}
      </p>

      {isProvider && jobStatus === 0 && budget === BigInt(0) && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 p-2.5 space-y-2">
          <p className="text-[11px] text-amber-400 font-mono">
            💰 Quote your price for this order — the buyer can't fund escrow until you do.
          </p>
          <div className="flex gap-2">
            <input
              value={retryAmount}
              onChange={(e) => setRetryAmount(e.target.value)}
              placeholder="Your quote (USDC)"
              className="flex-1 bg-zinc-800/80 border border-white/5 rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none focus:border-amber-500/40"
            />
            <button
              className="h-8 px-3 rounded-lg text-xs font-bold uppercase bg-amber-600 disabled:opacity-50"
              onClick={async () => {
                if (!retryAmount) return;
                const hash = await setBudgetWithRetry(jobId, retryAmount);
                if (hash) setRetryAmount("");
                refetch();
              }}
              disabled={status !== "idle" || !retryAmount}
            >
              Set Quote
            </button>
          </div>
        </div>
      )}

      {isClient && jobStatus === 0 && budget === BigInt(0) && (
        <p className="text-[11px] text-zinc-500 font-mono italic">
          Waiting for the supplier to quote a price for this order...
        </p>
      )}

      <div className="flex gap-2">
        {isClient && jobStatus === 0 && budget > BigInt(0) && (
          <button
            className="flex-1 h-9 rounded-lg text-xs font-bold uppercase bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 disabled:opacity-50"
            onClick={async () => {
              await fundJob(jobId, (Number(budget) / 1e6).toString());
              refetch();
            }}
            disabled={status !== "idle"}
          >
            {status === "approving" ? "Approving..." : "Fund Escrow"}
          </button>
        )}

        {isProvider && jobStatus === 1 && (
          <button
            className="flex-1 h-9 rounded-lg text-xs font-bold uppercase bg-zinc-700 disabled:opacity-50"
            onClick={async () => {
              await submitDeliverable(jobId, "ipfs://deliverable-placeholder");
              refetch();
            }}
            disabled={status !== "idle"}
          >
            {status === "submitting-tx" || status === "confirming" ? "Submitting..." : "Submit Proof of Delivery"}
          </button>
        )}

        {isClient && jobStatus === 2 && (
          <button
            className="flex-1 h-9 rounded-lg text-xs font-bold uppercase bg-emerald-600 disabled:opacity-50"
            onClick={async () => {
              await completeJob(jobId);
              refetch();
            }}
            disabled={status !== "idle"}
          >
            {status === "submitting-tx" || status === "confirming" ? "Releasing..." : "Release Payment"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function JobBoard() {
  const { createJob, status } = useJobBoard();
  const { isHolder } = useAccess();
  const { jobIds, loading: jobsLoading, addJobId } = useMyJobIds();

  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
  const [trackId, setTrackId] = useState("");

  async function handlePostJob() {
    const result = await createJob(provider as `0x${string}`, description);
    if (!result?.jobId) {
      // Either the tx failed, or JobCreated decoding failed (see the TODO in
      // useJobBoard.ts) — in the latter case the job WAS created onchain but
      // won't show up in this list until that's fixed.
      return;
    }
    // NOTE: budget is NOT set here. Per the contract, only the *provider*
    // can call setBudget — the client (this wallet) creating the job has no
    // permission to quote a price on the provider's behalf. The provider
    // sets it from their own JobRow once they see the job (see JobRow below).
    addJobId(result.jobId);
    setProvider("");
    setDescription("");
  }

  function handleTrackJob() {
    if (!trackId.trim()) return;
    try {
      addJobId(BigInt(trackId.trim()));
      setTrackId("");
    } catch {
      toast.error("That doesn't look like a valid job ID");
    }
  }

  return (
    <section
      className="
      relative
      overflow-hidden
      bg-zinc-900/80
      backdrop-blur-xl
      border
      border-white/10
      rounded-[28px]
      p-6
      shadow-2xl
      w-full
      max-w-200
      "
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-600 via-pink-500 to-blue-500" />
      <div className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-purple-500/50 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-blue-500/50 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-purple-500/25 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-blue-500/25 rounded-br-sm" />

      <div className="relative">
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-purple-400/80 font-semibold uppercase mb-1">
              // Trade Finance
            </p>
            <h2 className="text-xl font-bold tracking-tight">Purchase Order Escrow</h2>
          </div>
          <div className="bg-purple-500/15 border border-purple-500/30 rounded-full px-3 py-1 text-purple-300 text-[10px] font-mono font-semibold tracking-widest">
            ERC-8183
          </div>
        </div>

        {isHolder && (
          <div className="mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-2 text-[11px] font-mono text-emerald-400">
            🔓 Genesis Pass · escrow fee reduced
          </div>
        )}

        <div className="space-y-3 mb-6">
          <input
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="Supplier / counterparty address (0x...)"
            className="w-full bg-zinc-800/80 border border-white/5 rounded-2xl p-3.5 text-sm font-mono outline-none focus:border-purple-500/30 duration-300"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Purchase order / invoice description"
            className="w-full bg-zinc-800/80 border border-white/5 rounded-2xl p-3.5 text-sm outline-none focus:border-purple-500/30 duration-300"
          />
          <p className="text-[11px] text-zinc-600 font-mono px-1">
            Price isn't set here — the supplier quotes it after the order is created.
          </p>

          <button
            className="w-full h-12 rounded-xl text-sm font-bold tracking-wide uppercase bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 hover:scale-[1.01] active:scale-[0.99] duration-300 disabled:opacity-50"
            onClick={handlePostJob}
            disabled={status !== "idle"}
          >
            {status === "submitting-tx" ? "Creating..." : "Create Purchase Order"}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="Track an order you're the supplier on (Order #)"
            className="flex-1 bg-zinc-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:border-purple-500/30 duration-300"
          />
          <button
            className="px-4 rounded-xl text-xs font-bold uppercase bg-zinc-700 hover:bg-zinc-600 duration-200"
            onClick={handleTrackJob}
          >
            Track
          </button>
        </div>

        <div className="space-y-3">
          {jobsLoading && jobIds.length === 0 && (
            <p className="text-xs text-zinc-600 font-mono text-center py-4">
              Loading your orders from Arc...
            </p>
          )}
          {!jobsLoading && jobIds.length === 0 && (
            <p className="text-xs text-zinc-600 font-mono text-center py-4">
              No orders yet. Create one above, or enter an order ID to track one you're supplying.
            </p>
          )}
          {jobIds.map((id) => (
            <JobRow key={id.toString()} jobId={id} />
          ))}
        </div>
      </div>
    </section>
  );
}