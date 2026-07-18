"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAccount, useReadContract, useWriteContract, usePublicClient } from "wagmi";

import {
  IDENTITY_REGISTRY_ADDRESS,
  IDENTITY_REGISTRY_ABI,
} from "@/lib/agenticCommerce";

export type RegisterStatus = "idle" | "registering" | "success" | "failed";

export function useAgentIdentity() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const [status, setStatus] = useState<RegisterStatus>("idle");

  const { data: isRegistered, refetch: refetchIsRegistered } = useReadContract({
    address: IDENTITY_REGISTRY_ADDRESS,
    abi: IDENTITY_REGISTRY_ABI,
    functionName: "isRegistered",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: agentId, refetch: refetchAgentId } = useReadContract({
    address: IDENTITY_REGISTRY_ADDRESS,
    abi: IDENTITY_REGISTRY_ABI,
    functionName: "agentIdOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!isRegistered },
  });

  async function register(metadataURI: string) {
    if (!address) {
      toast.error("Connect your wallet first");
      return;
    }

    try {
      setStatus("registering");

      const hash = await writeContractAsync({
        address: IDENTITY_REGISTRY_ADDRESS,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "register",
        args: [metadataURI],
      });

      await publicClient?.waitForTransactionReceipt({ hash });

      setStatus("success");
      toast.success("Agent registered on Arc");

      refetchIsRegistered();
      refetchAgentId();
    } catch (error) {
      console.error(error);
      setStatus("failed");
      toast.error("Registration failed");
    }
  }

  return {
    status,
    isRegistered: !!isRegistered,
    agentId: agentId as bigint | undefined,
    register,
  };
}