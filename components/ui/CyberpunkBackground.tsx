export default function CyberpunkBackground() {
  return (
    <>
      {/* grid backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(168,85,247,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 25%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 25%, black 30%, transparent 100%)",
        }}
      />

      {/* glow orbs */}
      <div className="pointer-events-none fixed top-10 left-[10%] z-0 h-125 w-125 rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
      <div className="pointer-events-none fixed top-1/3 right-[8%] z-0 h-87.5 w-87.5 rounded-full bg-pink-500/20 blur-[100px] animate-ping" />
      <div
        className="pointer-events-none fixed bottom-10 left-1/3 z-0 h-100 w-100 rounded-full bg-blue-500/15 blur-[110px] animate-pulse"
        style={{ animationDuration: "6s" }}
      />
    </>
  );
}
