import './styles.css';
export default function EllipsesMenu() {
  return (
    <button className="group flex gap-1 p-2.5 rounded-lg hover:bg-[#1a1a1a]/5 active:bg-[#f2d5a6]/30 transition-all duration-200 active:scale-90 touch-none">
      <div className="w-1.5 h-1.5 rounded-full bg-[#224]/60 group-hover:bg-[#1a1a1a]/50 group-active:bg-[#1a1a1a]/80 transition-all duration-200 group-hover:scale-110 group-active:scale-75 group-active:opacity-60"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#224]/60 group-hover:bg-[#1a1a1a]/50 group-active:bg-[#1a1a1a]/80 transition-all duration-200 group-hover:scale-110 group-active:scale-75 group-active:opacity-60 delay-50"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#224]/60 group-hover:bg-[#1a1a1a]/50 group-active:bg-[#1a1a1a]/80 transition-all duration-200 group-hover:scale-110 group-active:scale-75 group-active:opacity-60 delay-100"></div>
    </button>
  );
}
