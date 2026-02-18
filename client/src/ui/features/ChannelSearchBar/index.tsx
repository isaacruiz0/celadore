import { useState } from 'react';
import { SquarePlus, Search, LoaderCircle } from 'lucide-react';
import type { Channel } from '../../../../../shared/types/Schemas';
import channelService from '@/model/youtube/channels/index';
import type { ViewMode } from './types';

function SearchButton({
  viewMode,
  handleSearch,
}: {
  viewMode: ViewMode;
  handleSearch: () => void;
}) {
  function renderIcon(viewMode: ViewMode) {
    switch (viewMode) {
      case 'searching':
        return (
          <LoaderCircle
            width={20}
            height={20}
            className="opacity-70 animate-spin"
            color="#1a1a1a"
          />
        );
      default:
        return (
          <Search
            width={20}
            height={20}
            className="opacity-70"
            color="#1a1a1a"
          />
        );
    }
  }
  return (
    <button
      onClick={handleSearch}
      className="h-10 flex items-center justify-center cursor-pointer transition-bg duration-100 hover:bg-[#224]/10 active:bg-[#224]/10 border-l-0 border-2 border-[#1a1a1a]/20 py-2 px-3.5 rounded-r-md hover:bg-"
    >
      {renderIcon(viewMode)}
    </button>
  );
}

function ChannelSearchBar({
  addHandler,
}: {
  addHandler: (channel: Channel) => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>('default');
  const [searchChannelInput, setSearchChannelInput] = useState<string>('');
  const [searchedChannel, setSearchedChannel] = useState<Channel | null>(null);

  function renderPopUnder(viewMode: ViewMode, searchedChannel: Channel | null) {
    if (viewMode === 'searching') {
      return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Searching for @{searchChannelInput}
          </div>
        </div>
      );
    }

    if (viewMode === 'notFound') {
      return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Did not find @{searchChannelInput}
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
            <p>@{searchedChannel.displayName}</p>
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

  async function searchChannel(channelUsername: string) {
    setViewMode('searching');
    const res = await channelService.get(channelUsername);
    if (res.status === 400) {
      setViewMode('notFound');
    } else if (res.status === 200) {
      const fetchedChannel = await res.json();

      setViewMode('default');
      setSearchedChannel(fetchedChannel);
    }
  }

  return (
    <div className="flex items-center gap-0 mb-4 relative">
      <input
        placeholder="Add @channel"
        className="h-10 w-full rounded-l-md border-2 border-[#1a1a1a]/20 px-3.5 py-2 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        onInput={(e) => {
          setViewMode('default');
          setSearchChannelInput(e.currentTarget.value);
        }}
        value={searchChannelInput}
      />
      <SearchButton
        handleSearch={() => searchChannel(searchChannelInput)}
        viewMode={viewMode}
      />
      {renderPopUnder(viewMode, searchedChannel)}
    </div>
  );
}

export default ChannelSearchBar;
