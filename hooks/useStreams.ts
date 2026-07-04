"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAccess } from "@/context/AccessContext";
import { useExecuteSend } from "./useExecuteSend";

export type StreamStatus = "active" | "completed";

export type StreamItem = {
  id: string;
  recipient: string;
  token: "USDC";
  totalAmount: number;
  ratePerSecond: number;
  durationSeconds: number;
  startedAt: number;
  withdrawnAmount: number;
  status: StreamStatus;
};

const STORAGE_KEY = "arcora_streams";

function loadStreams(): StreamItem[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveStreams(streams: StreamItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(streams));
}

export function useStreams() {
  const [streams, setStreams] = useState<StreamItem[]>([]);
  const [now, setNow] = useState<number>(() => Date.now());
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const { isHolder } = useAccess();
  const { executeSend } = useExecuteSend();

  useEffect(() => {
    setStreams(loadStreams());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, []);

  function accruedOf(stream: StreamItem) {
    const elapsedSeconds = Math.max(0, (now - stream.startedAt) / 1000);
    return Math.min(stream.totalAmount, stream.ratePerSecond * elapsedSeconds);
  }

  const feeRate = isHolder ? 0.0025 : 0.005;

  function startStream(
    recipient: string,
    totalAmount: number,
    durationSeconds: number
  ) {
    if (!recipient.trim()) {
      toast.error("Isi alamat recipient dulu");
      return;
    }

    if (!totalAmount || totalAmount <= 0) {
      toast.error("Amount harus lebih dari 0");
      return;
    }

    const stream: StreamItem = {
      id: crypto.randomUUID(),
      recipient: recipient.trim(),
      token: "USDC",
      totalAmount,
      ratePerSecond: totalAmount / durationSeconds,
      durationSeconds,
      startedAt: Date.now(),
      withdrawnAmount: 0,
      status: "active",
    };

    const next = [stream, ...streams];
    setStreams(next);
    saveStreams(next);
    toast.success("Stream started");
  }

  async function withdraw(id: string) {
    const stream = streams.find((s) => s.id === id);
    if (!stream) return;

    const accrued = accruedOf(stream);
    const withdrawable = accrued - stream.withdrawnAmount;

    if (withdrawable <= 0.000001) {
      toast.error("Belum ada saldo yang bisa ditarik");
      return;
    }

    setWithdrawingId(id);

    try {
      const result = await executeSend(
        withdrawable.toFixed(6),
        stream.recipient
      );

      if (!result.success) {
        return;
      }

      const updated = streams.map((s) =>
        s.id === id
          ? {
              ...s,
              withdrawnAmount: accrued,
              status: (accrued >= s.totalAmount
                ? "completed"
                : "active") as StreamStatus,
            }
          : s
      );

      setStreams(updated);
      saveStreams(updated);
    } finally {
      setWithdrawingId(null);
    }
  }

  return {
    streams,
    accruedOf,
    startStream,
    withdraw,
    withdrawingId,
    feeRate,
    isHolder,
  };
}