import type { Channel } from './types';
import { channelData } from './data';

function ChannelsList({ channels }: { channels: Channel[] }) {
  return channels.map((channel) => (
    <div key={channel.profilePictureURL} className="px-5 py-10 flex gap-2">
      <p>{channel.name}</p>
      <img src={channel.profilePictureURL} />
    </div>
  ));
}
export default function ChannelsManager() {
  return <ChannelsList channels={channelData} />;
}
