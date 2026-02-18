import type { Channel } from '@/../../shared/types/Schemas';
const basePath = '/api/db/channels';
async function getAll(): Promise<Array<Channel>> {
  return await fetch(basePath).then((r) => r.json());
}

export default { getAll };
