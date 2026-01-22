import { useState } from 'react';
import { StepForward, SquarePlus, SquareMinus } from 'lucide-react';
import Ellipses from '@/components/markup/Ellipses';
import './styles.css';
import { Link } from '@tanstack/react-router';
import { Menu } from '@base-ui/react/menu';

interface Experience {
  id: number;
  label: string;
  href: string;
  available: boolean;
}
// TODO: Source of truth for this should be in backend
const allPossibleExperiences: Array<Experience> = [
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
  {
    id: 3,
    label: 'Instagram',
    href: '/experiences/instagram',
    available: false,
  },
  {
    id: 4,
    label: 'Tiktok',
    href: '/experiences/tiktok',
    available: false,
  },
];

function ExperienceMenu({
  notSubscribedExperiences,
  addExperience,
}: {
  notSubscribedExperiences: Experience[];
  addExperience: (exp: Experience) => void;
}) {
  return (
    <div
      className="mt-4 bg-transparent backdrop-blur-lg rounded-2xl border-2 border-[#1a1a1a]/20 overflow-hidden origin-top"
      style={{
        boxShadow:
          '0 0 30px rgba(26, 26, 26, 0.15), inset 0 0 30px rgba(242, 213, 166, 0.2)',
        animation:
          'elegantReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      {notSubscribedExperiences.length > 0 ? (
        <div className="divide-y divide-[#1a1a1a]/10">
          {notSubscribedExperiences.map((experience, index) => (
            <button
              key={experience.id}
              onClick={() => experience.available && addExperience(experience)}
              className="w-full px-6 py-4 text-left hover:bg-[#f2d5a6]/20 transition-all duration-300 group relative overflow-hidden"
              style={{
                animation: `slideInStagger 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s both`,
              }}
            >
              <div className=" flex flex-col gap-1">
                <p className="font-medium text-[#1a1a1a] group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                  {experience.label}
                </p>
                {!experience.available && (
                  <p className="text-sm opacity-70">Not yet available</p>
                )}
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
  );
}

function SubscribedExperiencesList({
  subscribedExperiences,
}: {
  subscribedExperiences: Experience[];
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3">
      {subscribedExperiences.map((experience, index) => (
        <div
          key={experience.id}
          className="relative group"
          style={{
            animation: 'fadeInUp 0.5s ease-out forwards',
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
          }}
        >
          <Link
            to={experience.href}
            className="flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-md text-[#1a1a1a] border-2 border-[#1a1a1a]/30 hover:border-[#1a1a1a]/50 transition-all duration-500 relative overflow-hidden"
            style={{
              boxShadow:
                '0 0 25px rgba(26, 26, 26, 0.12), inset 0 0 25px rgba(242, 213, 166, 0.2)',
            }}
          >
            <div className="text-2xl relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              {experience.label}
            </div>
            <StepForward className="opacity-75 w-8 h-8]" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function ExperienceSelector() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subscribedExperiences, setSubscribedExperiences] = useState<
    Array<Experience>
  >([]);

  const addExperience = (experience: Experience) => {
    if (!subscribedExperiences.find((i) => i?.id === experience.id)) {
      setSubscribedExperiences([...subscribedExperiences, experience]);
    }
    setIsOpen(false);
  };

  const notSubscribedExperiences = allPossibleExperiences.filter(
    (experience) => !subscribedExperiences.find((i) => i?.id === experience.id),
  );

  return (
    <div className="w-full relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-transparent backdrop-blur-md flex items-center justify-between border-2 border-[#1a1a1a]/20"
      >
        <div className="text-left relative">
          <div className="font-semibold text-2xl text-[#224]/90">
            Experiences
          </div>
        </div>
        <div className="self-start">
          <Menu.Root>
            <Menu.Trigger>
              <Ellipses />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner className="outline-none" sideOffset={8}>
                <Menu.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                  <Menu.Item className="flex gap-1 items-center cursor-pointer py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900">
                    <span className="text-lg">Add</span>
                    <SquarePlus className="h-4 w-4" />
                  </Menu.Item>
                  <Menu.Item className="flex gap-1 items-center cursor-pointer py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900">
                    <span className="text-lg">Remove</span>
                    <SquareMinus className="h-4 w-4" />
                  </Menu.Item>{' '}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </div>
      </button>

      {isOpen && (
        <ExperienceMenu
          addExperience={addExperience}
          notSubscribedExperiences={notSubscribedExperiences}
        />
      )}
      <SubscribedExperiencesList
        subscribedExperiences={subscribedExperiences}
      />
    </div>
  );
}
