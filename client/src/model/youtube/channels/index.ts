const pathname = '/api/youtube/channels';
async function get(channelUsername: string): Promise<Response> {
  const query = `?handle=${channelUsername}`;
  return fetch(`${pathname}${query}`);
}

export default { get };
