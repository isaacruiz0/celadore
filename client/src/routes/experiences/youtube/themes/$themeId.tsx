import { createFileRoute } from '@tanstack/react-router';
import ListManagerHeader from '@/ui/features/ListManagers/ListManagerHeader';
import { SquarePlus, CalendarDays } from 'lucide-react';

export const Route = createFileRoute('/experiences/youtube/themes/$themeId')({
  component: FeedTheme,
});

function FeedTheme() {
  const { themeId } = Route.useParams();
  const menuItems = [
    {
      label: 'Channels',
      icon: SquarePlus,
      onClick: () => console.log('managing channel'),
    },

    {
      label: 'Adjust frequency',
      icon: CalendarDays,
      onClick: () => console.log('adjusting video pull in frequency'),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6] py-10">
      <h1 className="text-center text-3xl font-bold text-[#224] animate-fade-in antialiased">
        Youtube
      </h1>
      <div className="mt-5 w-full">
        <ListManagerHeader menuItems={menuItems} title={themeId} />
      </div>
    </div>
  );
}
