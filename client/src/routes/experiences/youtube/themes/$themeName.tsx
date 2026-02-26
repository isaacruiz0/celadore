import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import ListManagerHeader from '@/ui/features/ListManagers/ListManagerHeader';
import { SquarePlus, CalendarDays, LoaderCircle } from 'lucide-react';
import { Dialog } from '@base-ui/react/dialog';
import { useState } from 'react';
import ChannelsListManager from '@/ui/features/ListManagers/ChannelsListManager';
import ChannelSearchBar from '@/ui/features/ChannelSearchBar';
import type { Channel } from '../../../../../../shared/types/Schemas';
import dbChannelModel from '@/model/db/channels/index';
import videosService from '@/model/youtube/channels/videos/index';
import VideoListManager from '@/ui/features/ListManagers/VideoListManager/index';
import type { VideoItem } from '@/ui/features/ListManagers/types';

export const Route = createFileRoute('/experiences/youtube/themes/$themeName')({
  component: FeedTheme,
});

const today = new Date();
let twoWeeksago = new Date();
twoWeeksago.setDate(today.getDate() - 14);
twoWeeksago.setHours(0, 0, 0);

function FeedTheme() {
  const [showChannelListManagerDialog, setShowChannelListManagerDialog] =
    useState<boolean>(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [newChannels, setNewChannels] = useState<Channel[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [dateRange, setDateRange] = useState<Date>(twoWeeksago);
  const [savingNewChannels, setSavingNewChannels] = useState<boolean>(false);
  const { themeName } = Route.useParams();
  // @ts-ignore
  const { id } = Route.useSearch();

  useEffect(() => {
    async function getAllChannels(
      setChannels: (channels: Array<Channel>) => void,
    ) {
      try {
        const channels = await dbChannelModel.getAll(id);
        setChannels(channels);
      } catch (err) {
        console.log(err);
      }
    }
    getAllChannels(setChannels);
  }, []);

  useEffect(() => {
    if (!channels.length) return;
    async function getAndSetVideos() {
      let ret = await videosService.getVideosForChannels(
        channels.map((c) => c.uploadPlayListId),
      );
      if (!ret.length) return;

      //@ts-ignore
      ret = ret.reduce((acc, videoObj) => {
        //@ts-ignore
        videoObj.items = videoObj.items?.filter((item) => {
          return (
            new Date(item.contentDetails.videoPublishedAt).getTime() >
            dateRange.getTime()
          );
        });

        return acc.concat(videoObj.items);
      }, []);
      const data: VideoItem[] = [];
      //@ts-ignore
      ret.forEach((item) => {
        data.push({
          title: item.snippet.title,
          channelName: item.snippet.channelTitle,
          description: item.snippet.description,
          thumbnailURL: item.snippet.thumbnails.default.url,
          id: item.contentDetails.videoId,
        });
      });
      console.log(data);
      setVideos(data);
    }
    getAndSetVideos();
  }, [channels]);

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

  function addChannel(channel: Channel) {
    setChannels([...channels, channel]);
    setNewChannels([...newChannels, channel]);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F2D5A6] via-white to-[#F2D5A6] py-10">
      <h1 className="text-center text-3xl font-bold text-[#224] antialiased">
        <Link className="cursor" to="/experiences/youtube">
          Youtube
        </Link>
      </h1>
      <div className="mt-5 w-full">
        <ListManagerHeader menuItems={menuItems} title={themeName} />
      </div>
      <Dialog.Root open={showChannelListManagerDialog}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
            <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              Channels
            </Dialog.Title>
            <ChannelSearchBar addHandler={addChannel} feedThemeId={id} />
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
              <Dialog.Close
                onClick={async () => {
                  if (newChannels.length > 0) {
                    setSavingNewChannels(true);
                    const res = await dbChannelModel.addChannels(newChannels);
                    if (res.status === 200) {
                      // TODO: Show success toast
                      //
                    } else {
                      // TODO: Show failed toast
                    }
                    setSavingNewChannels(false);
                    setShowChannelListManagerDialog(false);
                  } else {
                    setShowChannelListManagerDialog(false);
                  }
                }}
                className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-3.5 text-base font-medium text-blue-700 select-none hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-600 active:bg-blue-100"
              >
                <div className="flex gap-2">
                  <span>Save</span>
                  {savingNewChannels && (
                    <LoaderCircle
                      width={20}
                      height={20}
                      className="opacity-70 animate-spin"
                      color="#1a1a1a"
                    />
                  )}
                </div>
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      <VideoListManager videoItemsList={videos} />
    </div>
  );
}
