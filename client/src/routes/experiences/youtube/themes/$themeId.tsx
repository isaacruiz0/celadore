import { createFileRoute } from '@tanstack/react-router';
import ListManagerHeader from '@/ui/features/ListManagers/ListManagerHeader';
import { SquarePlus, CalendarDays, Search } from 'lucide-react';
import { Dialog } from '@base-ui/react/dialog';
import { useState } from 'react';
import ChannelsListManager from '@/ui/features/ListManagers/ChannelsListManager';

export const Route = createFileRoute('/experiences/youtube/themes/$themeId')({
  component: FeedTheme,
});

function FeedTheme() {
  const [showChannelListManagerDialog, setShowChannelListManagerDialog] =
    useState<boolean>(false);
  const { themeId } = Route.useParams();
  const menuItems = [
    {
      label: 'Channels',
      icon: SquarePlus,
      onClick: () => setShowChannelListManagerDialog(true),
    },

    {
      label: 'Adjust frequency',
      icon: CalendarDays,
      onClick: () => console.log('adjusting video pull in frequency'),
    },
  ];
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6] py-10">
      <h1 className="text-center text-3xl font-bold text-[#224] antialiased">
        Youtube
      </h1>
      <div className="mt-5 w-full">
        <ListManagerHeader menuItems={menuItems} title={themeId} />
      </div>
      <Dialog.Root open={showChannelListManagerDialog}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
            <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              Channels
            </Dialog.Title>
            <div className="flex items-center gap-0">
              <input
                placeholder="Add @channel"
                className="h-fit w-full rounded-l-md border-2 border-[#1a1a1a]/20 px-3.5 py-2 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
              />
              <div className="cursor-pointer transition-bg duration-100 hover:bg-[#224]/10 active:bg-[#224]/10 border-l-0 border-2 border-[#1a1a1a]/20 py-2 px-3.5 rounded-r-md hover:bg-">
                <Search className="text-base opacity-70" color="#1a1a1a" />
              </div>
            </div>
            <ChannelsListManager />
            <div className="flex justify-end gap-4 mt-4">
              <Dialog.Close className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                Cancel
              </Dialog.Close>
              <Dialog.Close className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-3.5 text-base font-medium text-blue-700 select-none hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-600 active:bg-blue-100">
                <input type="submit" value="Save" />
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
