import type { Channel } from '../../../../../../shared/types/Schemas';
const basePath = '/api/youtube/channels/videos';
const getVideosForChannels = async (
  uploadPlayListIds: Array<Channel['uploadPlayListId']>,
) => {
  try {
    const params = new URLSearchParams();
    uploadPlayListIds.forEach((id) => {
      params.append('uploadPlayListIds', id);
    });

    const res = await fetch(basePath + '?' + params.toString()).then((r) =>
      r.json(),
    );
    return res;
  } catch (err) {
    console.log('Failed getting videos ' + err);
    return err;
  }
};

export default { getVideosForChannels };
