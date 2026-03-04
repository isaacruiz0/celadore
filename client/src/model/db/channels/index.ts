import type { Channel } from '@/../../shared/types/Schemas';
import type { FeedTheme } from '@/../../shared/types/Schemas';
const basePath = '/api/db/channels';
async function getAll(feedThemeId: FeedTheme['id']): Promise<Array<Channel>> {
  return await fetch(`${basePath}?parentFeedThemeId=${feedThemeId}`).then((r) =>
    r.json(),
  );
}

async function addChannels(channels: Array<Channel>): Promise<Response> {
  const res = await fetch(basePath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channels),
  });
  return res;
}

async function deleteChannel(id: string) {
  const res = await fetch(basePath, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return res;
}

export default { getAll, addChannels, deleteChannel };
