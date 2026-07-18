"use client";

import { useState } from "react";

import {

  DEFAULT_SLIPPAGE

} from "@/constants/slippage";

export function useSlippage() {

  const [

    slippage,

    setSlippage

  ] = useState(

    DEFAULT_SLIPPAGE

  );

  return {

    slippage,

    setSlippage

  };

}