export default function Footer() {

  return (

    <footer
      className="
      mt-20
      border-t
      border-white/10
      py-10
      text-zinc-400
      "
    >

      <div
        className="
        max-w-[1800px]
        mx-auto
        px-10
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
        "
      >

        <div>

          <h3
            className="
            text-xl
            font-bold
            text-white
            "
          >
            ARCora
          </h3>

          <p className="mt-2">
            Swap Anytime, Bridge Anywhere.
          </p>

          <p className="mt-2 text-sm">
            © 2026 ARCora. Built with Next.js and Circle.
          </p>

        </div>


        <div
          className="
          flex
          gap-6
          "
        >

          <a
            href="https://github.com/Arcticoz/"
            target="_blank"
            className="hover:text-white duration-300"
          >
            GitHub
          </a>

          <a
            href="https://x.com/forbyuu"
            target="_blank"
            className="hover:text-white duration-300"
          >
            X
          </a>

        </div>

      </div>

    </footer>

  );

}