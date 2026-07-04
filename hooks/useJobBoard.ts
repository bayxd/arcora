"use client";

import { useState } from "react";
import { toast } from "sonner";
import { parseUnits, keccak256, toHex, decodeEventLog } from "viem";
import { useAccount, useReadContract, useWriteContract, usePublicClient } from "wagmi";

import {
  AGENTIC_COMMERCE_ADDRESS,
  AGENTIC_COMMERCE_ABI,
  ERC20_APPROVE_ABI,
  USDC_ARC_TESTNET,
} from "@/lib/agenticCommerce";

export type JobActionStatus =
  | "idle"
  | "approving"
  | "submitting-tx"
  | "confirming"
  | "success"
  | "failed";

export function useJob(jobId: bigint) {
  const { data: job, refetch } = useReadContract({
    address: AGENTIC_COMMERCE_ADDRESS,
    abi: AGENTIC_COMMERCE_ABI,
    functionName: "getJob",
    args: [jobId],
  });

  return { job, refetch };
}

export function useJobBoard() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const [status, setStatus] = useState<JobActionStatus>("idle");

  async function createJob(
    provider: `0x${string}`,
    description: string,
    // Defaults: no custom evaluator (self), no custom hook (zero address),
    // expires in 30 days. Override these if the job needs something else —
    // TODO: surface evaluator/hook/expiredAt as real UI inputs later.
    options?: {
      evaluator?: `0x${string}`;
      hook?: `0x${string}`;
      expiresInSeconds?: number;
    }
  ) {
    if (!address) {
      toast.error("Connect your wallet first");
      return null;
    }
    try {
      setStatus("submitting-tx");
      const evaluator = options?.evaluator ?? address;
      const hook =
        options?.hook ?? "0x0000000000000000000000000000000000000000";
      const expiredAt = BigInt(
        Math.floor(Date.now() / 1000) + (options?.expiresInSeconds ?? 30 * 24 * 60 * 60)
      );
      const hash = await writeContractAsync({
        address: AGENTIC_COMMERCE_ADDRESS,
        abi: AGENTIC_COMMERCE_ABI,
        functionName: "createJob",
        args: [provider, evaluator, expiredAt, description, hook],
      });
      setStatus("confirming");
      const receipt = await publicClient?.waitForTransactionReceipt({ hash });
      setStatus("success");
      toast.success("Job posted");

      // Decode the real jobId from the JobCreated log (verified against a real
      // tx's decoded log on the explorer — see agenticCommerce.ts header note).
      let jobId: bigint | null = null;
      const log = receipt?.logs.find(
        (l) => l.address.toLowerCase() === AGENTIC_COMMERCE_ADDRESS.toLowerCase()
      );
      if (log) {
        try {
          const decoded = decodeEventLog({
            abi: AGENTIC_COMMERCE_ABI,
            eventName: "JobCreated",
            topics: log.topics,
            data: log.data,
          });
          jobId = (decoded.args as { jobId: bigint }).jobId;
        } catch (decodeError) {
          console.error("Could not decode JobCreated log — verify event ABI on explorer:", decodeError);
        }
      }
      return { hash, jobId };
    } catch (error) {
      console.error(error);
      setStatus("failed");
      toast.error("Could not create job");
      return null;
    } finally {
      setStatus("idle");
    }
  }

  async function setBudget(jobId: bigint, amountUsdc: string) {
    try {
      setStatus("submitting-tx");
      const amount = parseUnits(amountUsdc, 6); // USDC = 6 decimals
      const hash = await writeContractAsync({
        address: AGENTIC_COMMERCE_ADDRESS,
        abi: AGENTIC_COMMERCE_ABI,
        functionName: "setBudget",
        args: [jobId, amount, "0x"],
      });
      setStatus("confirming");
      await publicClient?.waitForTransactionReceipt({ hash });
      setStatus("success");
      return hash;
    } catch (error) {
      console.error(error);
      setStatus("failed");
      toast.error("Could not set budget");
      return null;
    } finally {
      setStatus("idle");
    }
  }

  // approve + fund in one call — mirrors the "estimate -> execute" feel of useSend
  async function fundJob(jobId: bigint, amountUsdc: string) {
    if (!address) {
      toast.error("Connect your wallet first");
      return;
    }
    try {
      const amount = parseUnits(amountUsdc, 6);

      setStatus("approving");
      const approveHash = await writeContractAsync({
        address: USDC_ARC_TESTNET,
        abi: ERC20_APPROVE_ABI,
        functionName: "approve",
        args: [AGENTIC_COMMERCE_ADDRESS, amount],
      });
      await publicClient?.waitForTransactionReceipt({ hash: approveHash });

      setStatus("submitting-tx");
      const fundHash = await writeContractAsync({
        address: AGENTIC_COMMERCE_ADDRESS,
        abi: AGENTIC_COMMERCE_ABI,
        functionName: "fund",
        args: [jobId, "0x"],
      });

      setStatus("confirming");
      await publicClient?.waitForTransactionReceipt({ hash: fundHash });

      setStatus("success");
      toast.success("Job funded — USDC escrowed 🔒");
    } catch (error) {
      console.error(error);
      setStatus("failed");
      toast.error("Funding failed");
    } finally {
      setStatus("idle");
    }
  }

  async function submitDeliverable(jobId: bigint, deliverableURI: string) {
    try {
      setStatus("submitting-tx");
      // Contract stores a bytes32 commitment, not the raw URI -- hash it here.
      // TODO: also persist the plaintext deliverableURI somewhere off-chain
      // (DB/IPFS pin record) so it can be looked up later from this hash.
      const deliverable = keccak256(toHex(deliverableURI));
      const hash = await writeContractAsync({
        address: AGENTIC_COMMERCE_ADDRESS,
        abi: AGENTIC_COMMERCE_ABI,
        functionName: "submit",
        args: [jobId, deliverable, "0x"],
      });
      setStatus("confirming");
      await publicClient?.waitForTransactionReceipt({ hash });
      setStatus("success");
      toast.success("Deliverable submitted");
    } catch (error) {
      console.error(error);
      setStatus("failed");
      toast.error("Submit failed");
    } finally {
      setStatus("idle");
    }
  }

  async function completeJob(jobId: bigint, reason: string = "approved") {
    try {
      setStatus("submitting-tx");
      const reasonBytes32 = keccak256(toHex(reason));
      const hash = await writeContractAsync({
        address: AGENTIC_COMMERCE_ADDRESS,
        abi: AGENTIC_COMMERCE_ABI,
        functionName: "complete",
        args: [jobId, reasonBytes32, "0x"],
      });
      setStatus("confirming");
      await publicClient?.waitForTransactionReceipt({ hash });
      setStatus("success");
      toast.success("Job completed — USDC released ✅");
    } catch (error) {
      console.error(error);
      setStatus("failed");
      toast.error("Completion failed");
    } finally {
      setStatus("idle");
    }
  }

  return {
    status,
    createJob,
    setBudget,
    fundJob,
    submitDeliverable,
    completeJob,
  };
}