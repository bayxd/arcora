import { ReactNode } from "react";

type Props = {
  title: string;
  value: ReactNode;
};

export default function StatsCard({
  title,
  value
}: Props) {

  return (

    <div
      className="
      bg-zinc-900/70
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-6
      shadow-xl
      hover:border-purple-500/50
      hover:shadow-purple-500/20
      hover:scale-[1.02]
      transition-all
      duration-300
      "
    >

      <div
        className="
        flex
        flex-col
        gap-3
        "
      >

        <h3
          className="
          text-zinc-500
          uppercase
          tracking-widest
          text-xs
          font-semibold
          "
        >
          {title}
        </h3>

        <div
          className="
          text-4xl
          font-black
          text-white
          "
        >
          {value}
        </div>

      </div>

    </div>

  );

}