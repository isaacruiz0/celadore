import type { Channel } from '@/../../shared/types/Schemas';
const basePath = '/api/db/channels';
async function getAll(): Promise<Array<Channel>> {
  return await fetch(basePath).then((r) => r.json());
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

export default { getAll, addChannels };
