import { createFileRoute } from '@tanstack/react-router';
import ListManagerHeader from '@/ui/features/ListManagers/ListManagerHeader';
import { SquarePlus, CalendarDays, Search } from 'lucide-react';
import { Dialog } from '@base-ui/react/dialog';
import { useState } from 'react';
import ChannelsListManager from '@/ui/features/ListManagers/ChannelsListManager';
import { channelData } from './data';
import type { Channel } from '@/ui/features/ListManagers/ChannelsListManager/types';

export const Route = createFileRoute('/experiences/youtube/themes/$themeId')({
  component: FeedTheme,
});

function FeedTheme() {
  const [showChannelListManagerDialog, setShowChannelListManagerDialog] =
    useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchingChannel, setSearchingChannel] = useState<boolean>(false);
  const [searchChannelInput, setSearchChannelInput] = useState<string>('');
  const [searchedChannel, setSearchedChannel] = useState<Channel | undefined>();
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
  function searchChannel(
    channelUsername: string,
    channelList: Channel[],
  ): Channel | undefined {
    setSearchingChannel(true);
    const searchedChannel = channelList.find(
      (channel) => channel.username === channelUsername,
    );
    setSearchingChannel(false);
    return searchedChannel;
  }

  function addChannel(channel: Channel) {
    setChannels([...channels, channel]);
  }

  function renderPopUnder(
    searchingChannel: boolean,
    searchedChannel: Channel | undefined,
  ) {
    if (searchingChannel) {
      return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          <div className="p-2 hover:bg-gray-100 cursor-pointer">
            Searching for @{searchChannelInput}
          </div>
        </div>
      );
    }

    if (searchedChannel) {
      return (
        <div className="px-4 py-2 absolute hover:bg-gray-100 cursor-pointer top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={searchedChannel.profilePictureURL}
              alt="Youtube profile picture"
              className='"w-8 h-8 rounded-4xl'
            />
            <p>@{searchedChannel.username}</p>
          </div>
          <SquarePlus
            onClick={() => {
              setSearchedChannel(undefined);
              addChannel(searchedChannel);
            }}
            color="#1a1a1a"
            className="h-8 w-8 opacity-70"
          />
        </div>
      );
    }
  }

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
            <div className="flex items-center gap-0 mb-4 relative">
              <input
                placeholder="Add @channel"
                className="h-10 w-full rounded-l-md border-2 border-[#1a1a1a]/20 px-3.5 py-2 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
                onInput={(e) => setSearchChannelInput(e.currentTarget.value)}
                value={searchChannelInput}
              />
              <button
                onClick={() =>
                  setSearchedChannel(
                    searchChannel(searchChannelInput, channelData),
                  )
                }
                className="h-10 flex items-center justify-center cursor-pointer transition-bg duration-100 hover:bg-[#224]/10 active:bg-[#224]/10 border-l-0 border-2 border-[#1a1a1a]/20 py-2 px-3.5 rounded-r-md hover:bg-"
              >
                <Search
                  width={20}
                  height={20}
                  className="opacity-70"
                  color="#1a1a1a"
                />
              </button>
              {renderPopUnder(searchingChannel, searchedChannel)}
            </div>
            <ChannelsListManager
              channelsData={channels}
              handleChannels={setChannels}
            />
            <div className="flex justify-end gap-4 mt-4">
              <Dialog.Close
                onClick={() => setShowChannelListManagerDialog(false)}
                className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
              >
                Cancel
              </Dialog.Close>
              <Dialog.Close className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-3.5 text-base font-medium text-blue-700 select-none hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-600 active:bg-blue-100">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setShowChannelListManagerDialog(false);
                  }}
                >
                  Save
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
