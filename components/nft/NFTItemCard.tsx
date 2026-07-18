import Image from "next/image";
import Link from "next/link";

type Props = {
  tokenId: string;
};

export default function NFTItemCard({
  tokenId
}: Props) {

  return (

    <Link
      href={`/nft/${tokenId}`}
    >

      <div
        className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-5
        shadow-xl
        hover:scale-105
        hover:border-purple-500
        hover:shadow-purple-500/20
        duration-300
        cursor-pointer
        "
      >

        <Image
          src="https://gateway.pinata.cloud/ipfs/bafybeidn35bgjvbbss7vwcu6hfwibumgvkd46uonkiq53eqwbs4hmcdo24"
          width={250}
          height={250}
          alt="ARCora Early Access Badge"
          className="
          rounded-2xl
          w-full
          "
        />

        <div className="mt-5">

          <h3
            className="
            text-xl
            font-bold
            "
          >
            ARCora Collection
          </h3>


          <div
            className="
            flex
            items-center
            justify-between
            mt-5
            "
          >

            <div>

              <p
                className="
                text-zinc-500
                text-sm
                "
              >
                Token ID
              </p>

              <p
                className="
                font-semibold
                mt-1
                "
              >
                #{tokenId}
              </p>

            </div>

            <div
              className="
              text-green-400
              font-semibold
              "
            >
              Owned ✓
            </div>

          </div>

        </div>

      </div>

    </Link>

  );

}