"use client";

import {
  useWriteContract
} from "wagmi";

import {
  NFT_ADDRESS
} from "@/lib/contracts";

const abi = [

  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: []
  }

] as const;

export default function NFTCard() {

  const {
    writeContract
  } = useWriteContract();


 

  

}