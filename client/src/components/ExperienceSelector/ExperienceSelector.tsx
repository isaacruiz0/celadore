import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import './styles.css';

interface Experience {
  id: number;
  label: string;
  href: string;
  available: boolean;
}
const allExperiences: Array<Experience> = [
  {
    id: 1,
    label: 'Youtube',
    href: '/experiences/youtube',
    available: true,
  },
  {
    id: 2,
    label: 'Reddit',
    href: '/experiences/reddit',
    available: false,
  },
];

export default function ExperienceSelector() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedExperiences, setSelectedItems] = useState<
    Array<Experience | null>
  >([]);

  const addItem = (item: Experience) => {
    if (!selectedExperiences.find((i) => i?.id === item.id)) {
      setSelectedItems([...selectedExperiences, item]);
    }
    setIsOpen(false);
  };

  const removeExperience = (id: Experience['id']) => {
    setSelectedItems(selectedExperiences.filter((i) => i?.id !== id));
  };

  const unselectedExperiences = allExperiences.filter(
    (item) => !selectedExperiences.find((i) => i?.id === item.id),
  );

  return (
    <div className="w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-transparent backdrop-blur-md text-[#1a1a1a] rounded-2xl border-2 border-[#1a1a1a]/20 hover:border-[#1a1a1a]/40 transition-all duration-500 flex items-center justify-between group relative overflow-hidden"
        style={{
          boxShadow:
            '0 0 20px rgba(26, 26, 26, 0.1), inset 0 0 20px rgba(242, 213, 166, 0.15)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f2d5a6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="text-left relative z-10">
          <div className="font-semibold text-lg">Experiences</div>
          <div className="text-sm opacity-70">Click to add more</div>
        </div>
        <ChevronDown
          className={`w-6 h-6 transition-all duration-500 relative z-10 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="mt-4 bg-transparent backdrop-blur-lg rounded-2xl border-2 border-[#1a1a1a]/20 overflow-hidden origin-top"
          style={{
            boxShadow:
              '0 0 30px rgba(26, 26, 26, 0.15), inset 0 0 30px rgba(242, 213, 166, 0.2)',
            animation:
              'elegantReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          {unselectedExperiences.length > 0 ? (
            <div className="divide-y divide-[#1a1a1a]/10">
              {unselectedExperiences.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="w-full px-6 py-4 text-left hover:bg-[#f2d5a6]/20 transition-all duration-300 group relative overflow-hidden"
                  style={{
                    animation: `slideInStagger 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s both`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f2d5a6]/0 via-[#f2d5a6]/30 to-[#f2d5a6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="font-medium text-[#1a1a1a] group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                    {item.label}
                  </div>
                  <div className="text-sm text-[#1a1a1a]/60 mt-0.5 relative z-10">
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 text-[#1a1a1a]/50 text-center">
              All experiences selected
            </div>
          )}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3">
        {selectedExperiences.map((item, index) => (
          <div
            key={item.id}
            className="relative group"
            style={{
              animation: 'fadeInUp 0.5s ease-out forwards',
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
            }}
          >
            <a
              href={item.href}
              className="block px-6 py-4 bg-transparent backdrop-blur-md text-[#1a1a1a] rounded-xl border-2 border-[#1a1a1a]/30 hover:border-[#1a1a1a]/50 transition-all duration-500 relative overflow-hidden"
              style={{
                boxShadow:
                  '0 0 25px rgba(26, 26, 26, 0.12), inset 0 0 25px rgba(242, 213, 166, 0.2)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f2d5a6]/20 via-transparent to-[#1a1a1a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 border-2 border-[#f2d5a6]/0 group-hover:border-[#f2d5a6]/30 rounded-xl transition-all duration-500"></div>
              <div className="font-medium relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                {item.label}
              </div>
              <div className="text-sm opacity-70 mt-1 relative z-10">
                {item.desc}
              </div>
            </a>
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-3 right-3 w-7 h-7 bg-[#1a1a1a]/80 backdrop-blur-sm text-[#f2f2f2] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-[#f2d5a6]/30"
              style={{
                boxShadow: '0 0 15px rgba(26, 26, 26, 0.3)',
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
