"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useEstimateSend } from "@/hooks/send/useEstimateSend";
import { useExecuteSend } from "@/hooks/send/useExecuteSend";

export type SendStatus =

  | "idle"
  | "estimating"
  | "sending"
  | "success"
  | "failed";

export function useSend() {

  const [

    status,

    setStatus

  ] = useState<SendStatus>(
    "idle"
  );

  const {

    estimate,

    getEstimate

  } = useEstimateSend();

  const {

    executeSend

  } = useExecuteSend();

  async function send(

    amount: string,

    recipient: string

  ) {

    try {

      setStatus(
        "estimating"
      );

      const estimateData =

        await getEstimate(

          amount,

          recipient

        );

      if (

        !estimateData.success

      ) {

        setStatus(
          "failed"
        );

        toast.error(

          estimateData.message

        );

        return;

      }

      setStatus(
        "sending"
      );

      const data =

        await executeSend(

          amount,

          recipient

        );

      if (

        data.success

      ) {

        setStatus(
          "success"
        );

      }

      else {

        setStatus(
          "failed"
        );

        toast.error(

          data.message ??

          "Send failed"

        );

      }

    }

    catch (error) {

      console.error(
        error
      );

      setStatus(
        "failed"
      );

      toast.error(
        "Send failed"
      );

    }

  }

  return {

    status,

    estimate,

    send

  };

}