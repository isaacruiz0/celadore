import { createFileRoute, Link } from '@tanstack/react-router';
import ExperienceListManager from '@/ui/features/ExperienceListManager/ExperienceListManager';

export const Route = createFileRoute('/experiences/')({
  component: Experiences,
});

function Experiences() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-linear-to-br bg-gold-light from-gold-light via-white to-gold-light py-10">
      <Link to="/">
        <h1 className="text-center text-5xl font-bold text-[#224] animate-fade-in antialiased pointer-none cursor-pointer">
          Celadore
        </h1>
      </Link>

      <div className="animate-fade-in mt-5 w-full">
        <ExperienceListManager />
      </div>
    </div>
  );
}
