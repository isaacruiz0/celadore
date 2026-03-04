import type { FeedTheme } from '../../../../../shared/types/Schemas';
const pathname = '/api/youtube/channels';
async function get(
  channelUsername: string,
  feedThemeId: FeedTheme['id'],
): Promise<Response> {
  const query = `?handle=${channelUsername}&feedThemeId=${feedThemeId}`;
  return fetch(`${pathname}${query}`);
}

export default { get };
