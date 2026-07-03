type Props = {

  onClick: () => void;

};

export default function SwapDirectionButton({

  onClick

}: Props) {

  return (

    <div
      className="
      flex
      justify-center
      -my-2.5
      relative
      z-10
      "
    >

      <button

        onClick={onClick}

        className="
        w-9
        h-9
        rounded-full
        bg-zinc-900
        border
        border-purple-500/30
        text-sm
        text-zinc-300
        shadow-[0_0_12px_rgba(168,85,247,0.25)]
        hover:border-purple-500/60
        hover:shadow-[0_0_18px_rgba(168,85,247,0.4)]
        hover:rotate-180
        hover:scale-110
        hover:text-white
        duration-300
        "
      >

        ⇅

      </button>

    </div>

  );

}