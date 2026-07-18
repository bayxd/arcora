"use client";

import { useAccount, useBalance } from "wagmi";

export default function USDCPBalance() {

    const { address } = useAccount();

    const { data } =
        useBalance({

            address

        });

    return (

        <>

            {

                data?.formatted

            }

        </>

    );

}