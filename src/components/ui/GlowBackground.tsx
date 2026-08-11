export default function GlowBackground() {
  return (
    <>
      <div
        className="
          fixed
          top-0
          left-0
          w-96
          h-96
          bg-cyan-500
          opacity-10
          blur-[120px]
          pointer-events-none
        "
      />

      <div
        className="
          fixed
          bottom-0
          right-0
          w-96
          h-96
          bg-blue-500
          opacity-10
          blur-[120px]
          pointer-events-none
        "
      />
    </>
  );
}