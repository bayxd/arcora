import { useAccount, useReadContract } from "wagmi";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_GENESIS_PASS_CONTRACT as `0x${string}`;

const abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ type: "uint256" }]
  }
] as const;

export function useGenesisPass() {
  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address
    }
  });

  const isHolder = address && data ? Number(data) > 0 : false;

  return {
    isHolder,
    isLoading: !!address && isLoading
  };
}