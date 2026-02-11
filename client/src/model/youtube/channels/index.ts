import type { Channel } from '../../../../../shared/types/channel';

const pathname = '/api/youtube/channels';
async function get(channelUsername: string): Promise<Channel> {
  const query = `?handle=${channelUsername}`;
  const res: Channel = await fetch(`${pathname}${query}`).then((r) => r.json());

  return res;
}

export default { get };
