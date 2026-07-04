// Arc Testnet — official pre-deployed contracts (from docs.arc.io tutorials)
// ERC-8183: Agentic Commerce (job escrow) — https://docs.arc.io/arc/tutorials/create-your-first-erc-8183-job
// ERC-8004: Trustless Agents (identity/reputation) — https://docs.arc.io/arc/tutorials/register-your-first-ai-agent
//
// NOTE: ABIs below are condensed to the functions/events this feature actually uses.
// Double-check parameter order against the docs pages above before relying on this in prod —
// copy this file's addresses/ABI 1:1 from there if anything here looks off.

export const AGENTIC_COMMERCE_ADDRESS =
  "0x0747EEf0706327138c69792bF28Cd525089e4583" as const;

export const IDENTITY_REGISTRY_ADDRESS =
  "0x8004A818BFB912233c491871b3d84c89A494BD9e" as const;

export const REPUTATION_REGISTRY_ADDRESS =
  "0x8004B663056A597Dffe9eCcC1965A193B7388713" as const;

export const VALIDATION_REGISTRY_ADDRESS =
  "0x8004Cb1BF31DAf7788923b405b754f57acEB4272" as const;

// Arc Testnet USDC (same token your Send/Swap/Bridge cards already use)
export const USDC_ARC_TESTNET =
  "0x3600000000000000000000000000000000000000" as const;

export const ERC20_APPROVE_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

// VERIFIED against Arc Testnet explorer's Read/Write contract UI on the
// implementation at 0xa316fd02827242d537f84730f8a37d0ba5fd351a.
// createJob / setBudget / fund / getJob / submit / complete function signatures,
// AND the JobCreated event, were all confirmed directly from the explorer
// (function forms + a decoded log on a real createJob tx).
// JobFunded / JobSubmitted / JobCompleted events were NOT checked against a real
// log the way JobCreated was -- they're carried over from the tutorial. If fundJob/
// submitDeliverable/completeJob ever need to decode something from their receipts
// (they don't today), verify those event shapes on the explorer first, the same
// way JobCreated's turned out to be missing evaluator/expiredAt/hook.
// reject / claimRefund were NOT checked at all -- the explorer's method list also
// shows fns this file doesn't wire up (evaluatorFeeBP, setEvaluatorFee,
// whitelistedHooks, setHookWhitelist, jobHasBudget, jobCounter, platformFeeBP,
// platformTreasury).
export const AGENTIC_COMMERCE_ABI = [
  {
    type: "function",
    name: "createJob",
    stateMutability: "nonpayable",
    inputs: [
      { name: "provider", type: "address" },
      { name: "evaluator", type: "address" },
      { name: "expiredAt", type: "uint256" },
      { name: "description", type: "string" },
      { name: "hook", type: "address" },
    ],
    outputs: [{ name: "jobId", type: "uint256" }],
  },
  {
    type: "function",
    name: "setBudget",
    stateMutability: "nonpayable",
    inputs: [
      { name: "jobId", type: "uint256" },
      { name: "amount", type: "uint256" },
      { name: "optParams", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "fund",
    stateMutability: "nonpayable",
    inputs: [
      { name: "jobId", type: "uint256" },
      { name: "optParams", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "submit",
    stateMutability: "nonpayable",
    inputs: [
      { name: "jobId", type: "uint256" },
      { name: "deliverable", type: "bytes32" },
      { name: "optParams", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "complete",
    stateMutability: "nonpayable",
    inputs: [
      { name: "jobId", type: "uint256" },
      { name: "reason", type: "bytes32" },
      { name: "optParams", type: "bytes" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getJob",
    stateMutability: "view",
    inputs: [{ name: "jobId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "id", type: "uint256" },
          { name: "client", type: "address" },
          { name: "provider", type: "address" },
          { name: "evaluator", type: "address" },
          { name: "description", type: "string" },
          { name: "budget", type: "uint256" },
          { name: "expiredAt", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "hook", type: "address" },
        ],
      },
    ],
  },
  {
    type: "event",
    name: "JobCreated",
    inputs: [
      { name: "jobId", type: "uint256", indexed: true },
      { name: "client", type: "address", indexed: true },
      { name: "provider", type: "address", indexed: true },
      { name: "evaluator", type: "address", indexed: false },
      { name: "expiredAt", type: "uint256", indexed: false },
      { name: "hook", type: "address", indexed: false },
    ],
  },
  {
    type: "event",
    name: "JobFunded",
    inputs: [
      { name: "jobId", type: "uint256", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "JobSubmitted",
    inputs: [{ name: "jobId", type: "uint256", indexed: true }],
  },
  {
    type: "event",
    name: "JobCompleted",
    inputs: [{ name: "jobId", type: "uint256", indexed: true }],
  },
] as const;

export const IDENTITY_REGISTRY_ABI = [
  {
    type: "function",
    name: "register",
    stateMutability: "nonpayable",
    inputs: [{ name: "metadataURI", type: "string" }],
    outputs: [{ name: "agentId", type: "uint256" }],
  },
  {
    type: "function",
    name: "agentIdOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "agentId", type: "uint256" }],
  },
  {
    type: "function",
    name: "isRegistered",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export const REPUTATION_REGISTRY_ABI = [
  {
    type: "function",
    name: "giveFeedback",
    stateMutability: "nonpayable",
    inputs: [
      { name: "agentId", type: "uint256" },
      { name: "score", type: "uint8" }, // 0-100
      { name: "context", type: "string" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "reputationOf",
    stateMutability: "view",
    inputs: [{ name: "agentId", type: "uint256" }],
    outputs: [
      { name: "averageScore", type: "uint256" },
      { name: "feedbackCount", type: "uint256" },
    ],
  },
] as const;