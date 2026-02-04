import type { Channel } from './types';
import { Minus } from 'lucide-react';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { useState } from 'react';

function ChannelPill({
  channel,
  onRemove,
}: {
  channel: Channel;
  onRemove: (id: Channel['id']) => void;
}) {
  return (
    <div
      key={channel.profilePictureURL}
      className="w-full flex justify-between items-center px-6 py-4
       text-3xl text-[#224] border-b-2 border-[#1a1a1a]/20 hover:border-[#1a1a1a]/50 transition-all duration-500 relative overflow-hidden rounded-xl"
      style={{
        boxShadow:
          '0 0 25px rgba(26, 26, 26, 0.12), inset 0 0 25px rgba(242, 213, 166, 0.2)',
      }}
    >
      <div className="flex gap-2 items-center">
        <img src={channel.profilePictureURL} className="w-8 h-8 rounded-4xl" />
        <p className="text-sm">{channel.name}</p>
      </div>

      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Minus width={10} height={10} className="cursor-pointer" />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
            <AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              Remove channel?
            </AlertDialog.Title>
            <AlertDialog.Description className="mb-6 text-base text-gray-600">
              You can’t undo this action.
            </AlertDialog.Description>
            <div className="flex justify-end gap-4">
              <AlertDialog.Close className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                Cancel
              </AlertDialog.Close>
              <AlertDialog.Close
                onClick={() => onRemove(channel.id)}
                className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-red-200 bg-red-50 px-3.5 text-base font-medium text-red-800 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
              >
                Delete
              </AlertDialog.Close>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}

function ChannelsList({
  channels,
  onRemove,
}: {
  channels: Channel[];
  onRemove: (id: Channel['id']) => void;
}) {
  return channels.map((channel) => (
    <ChannelPill channel={channel} onRemove={onRemove} />
  ));
}
export default function ChannelsListManager({
  channelsData,
  handleChannels,
}: {
  channelsData: Channel[];
  handleChannels: (channel: Channel[]) => void;
}) {
  const onRemove = (id: Channel['id']) =>
    handleChannels(channelsData.filter((channel) => channel.id !== id));
  return <ChannelsList channels={channelsData} onRemove={onRemove} />;
}
