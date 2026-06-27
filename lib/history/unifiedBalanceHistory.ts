export interface UnifiedBalanceHistoryItem {

  type: "deposit" | "spend";

  amount: string;

  chain: string;

  txHash: string;

  explorerUrl?: string;

  transferId?: string;

  recipient?: string;

  createdAt: number;

}

const STORAGE_KEY =

"arcora-unified-history";

export function getHistory() {

  if (

    typeof window ===

    "undefined"

  )

    return [];

  const raw =

    localStorage.getItem(

      STORAGE_KEY

    );

  if (!raw)

    return [];

  return JSON.parse(raw);

}

export function saveHistory(

  item: UnifiedBalanceHistoryItem

) {

  const history =

    getHistory();

  history.unshift(item);

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(history)

  );

}