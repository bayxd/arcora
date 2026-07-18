"use client";

import { useState } from "react";

export function useAmount() {

  const [

    amount,

    setAmount

  ] = useState(
    "1"
  );

  return {

    amount,

    setAmount

  };

}