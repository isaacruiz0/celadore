export default function FadeInHero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6]">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="text-center text-7xl font-bold text-[#224] animate-fade-in antialiased">
          Celadore
        </h1>
        <p className="text-center text-sm w-60 text-[#224] animate-fade-in-delayed antialiased">
          Meaningful content starts with control over it
        </p>
      </div>
    </div>
  );
}
