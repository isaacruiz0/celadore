import type { Channel } from '../../../../../shared/types/channel';

const pathname = '/api/youtube/channels';
async function get(channelUsername: string): Promise<Channel> {
  const res: Channel = await fetch(`${pathname}/${channelUsername}`).then((r) =>
    r.json(),
  );
  function wait(ms: number) {
    var start = Date.now(),
      now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }
  wait(3000);
  return res;
}

export default { get };
