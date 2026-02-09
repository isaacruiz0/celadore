import { useState } from 'react';
import { SquarePlus, Search } from 'lucide-react';
import { channelData } from '@/routes/experiences/youtube/themes/data';
import type { Channel } from '../ListManagers/ChannelsListManager/types';

function ChannelSearchBar({
  addHandler,
}: {
  addHandler: (channel: Channel) => void;
}) {
  const [searchingChannel, setSearchingChannel] = useState<boolean>(false);
  const [searchChannelInput, setSearchChannelInput] = useState<string>('');
  const [searchedChannel, setSearchedChannel] = useState<Channel | null>(null);

  function renderPopUnder(
    searchingChannel: boolean,
    searchedChannel: Channel | null,
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
              setSearchedChannel(null);
              addHandler(searchedChannel);
            }}
            color="#1a1a1a"
            className="h-8 w-8 opacity-70 hover:opacity-50"
          />
        </div>
      );
    }
  }

  function searchChannel(
    channelUsername: string,
    channelList: Channel[],
  ): Channel | null {
    setSearchingChannel(true);
    const searchedChannel =
      channelList.find((channel) => channel.username === channelUsername) ||
      null;
    setSearchingChannel(false);
    return searchedChannel;
  }

  return (
    <div className="flex items-center gap-0 mb-4 relative">
      <input
        placeholder="Add @channel"
        className="h-10 w-full rounded-l-md border-2 border-[#1a1a1a]/20 px-3.5 py-2 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        onInput={(e) => setSearchChannelInput(e.currentTarget.value)}
        value={searchChannelInput}
      />
      <button
        onClick={() =>
          setSearchedChannel(searchChannel(searchChannelInput, channelData))
        }
        className="h-10 flex items-center justify-center cursor-pointer transition-bg duration-100 hover:bg-[#224]/10 active:bg-[#224]/10 border-l-0 border-2 border-[#1a1a1a]/20 py-2 px-3.5 rounded-r-md hover:bg-"
      >
        <Search width={20} height={20} className="opacity-70" color="#1a1a1a" />
      </button>
      {renderPopUnder(searchingChannel, searchedChannel)}
    </div>
  );
}

export default ChannelSearchBar;
