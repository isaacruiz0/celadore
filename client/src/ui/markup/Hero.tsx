import { Link } from '@tanstack/react-router';

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6]">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="pointer-none text-center text-6xl font-bold text-[#224] animate-fade-in antialiased">
          Celadore
        </h1>
        <p className="text-center text-sm w-60 text-[#224] animate-fade-in-delayed antialiased">
          Meaningful content starts with control over it
        </p>
        <Link
          to="/experiences"
          className="animate-fade-in-delayed-plus mt-4 relative px-8 py-4 bg-transparent backdrop-blur-md border-2 border-[#1a1a1a]/30 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#1a1a1a]/50 active:scale-95 hover:shadow-2xl hover:shadow-[#1a1a1a]/10"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-[silver]/25 to-transparent animate-shimmer"></div>

          <span className="relative z-10 text-lg font-semibold tracking-wide text-[#1a1a1a]/90 group-hover:text-[#1a1a1a] transition-colors duration-300">
            Demo app
          </span>
        </Link>
      </div>
    </div>
  );
}
