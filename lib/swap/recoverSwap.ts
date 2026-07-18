export async function recoverSwap(

  execute: () => Promise<any>

) {

  const MAX_RETRIES = 3;

  let lastError;

  for (

    let attempt = 1;

    attempt <= MAX_RETRIES;

    attempt++

  ) {

    try {

      console.log(
        `SWAP ATTEMPT ${attempt}`
      );

      return await execute();

    }

    catch (error: any) {

      lastError = error;

      console.log(

        `ATTEMPT ${attempt} FAILED`

      );

      // Detect a rate-limit response from the RPC specifically (Arc
      // Testnet's shared public RPC returns { code: -32011, message:
      // "request limit reached" } when it's overloaded). Retrying that
      // quickly just adds more requests on top of a limit that's already
      // being hit -- it doesn't help, and can make things worse. Back off
      // much longer for this specific case instead of the normal delay.
      const isRateLimited =
        error?.cause?.cause?.code === -32011 ||
        error?.cause?.trace?.cause?.code === -32011 ||
        /request limit reached/i.test(String(error?.message ?? ""));

      if (

        attempt < MAX_RETRIES

      ) {

        const delayMs = isRateLimited
          ? 20000 * attempt // 20s, 40s -- give the RPC real breathing room
          : 3000 * attempt; // original behavior for other transient errors

        console.log(
          isRateLimited
            ? `Rate limited by RPC -- backing off ${delayMs / 1000}s before retrying...`
            : `Retrying in ${delayMs / 1000} seconds...`
        );

        await new Promise(

          resolve =>

            setTimeout(

              resolve,

              delayMs

            )

        );

      }

    }

  }

  throw lastError;

}