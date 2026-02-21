import type { FeedTheme } from '../../../../../shared/types/Schemas';
const basePath = '/api/db/themes';
const save = async (feedTheme: FeedTheme) => {
  const res = await fetch(basePath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedTheme),
  });
  return res;
};

// TODO: pass in user id
const getAll = async () => {
  const res = await fetch(basePath);
  return res;
};

export default { save, getAll };
