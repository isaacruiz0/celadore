import { createFileRoute } from '@tanstack/react-router';
import ThemeListManager from '@/ui/features/ThemeListManager';

export const Route = createFileRoute('/experiences/youtube/')({
  component: Youtube,
});

function Youtube() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6] py-10">
      <h1 className="text-center text-3xl font-bold text-[#224] animate-fade-in antialiased">
        Youtube
      </h1>
      <div className="mt-5 w-full">
        <ThemeListManager />
      </div>
    </div>
  );
}
