import type { Channel } from '../../../../../../shared/types/Schemas';
const basePath = '/api/youtube/channels/videos';

/**
 * @param uploadPlayListIds an array of uploadPlayListIds
 * @returns TODO: ADD RESPONSE TYPE HERE
 */
const getVideosForChannels = async (
  uploadPlayListIds: Array<Channel['uploadPlayListId']>,
) => {
  try {
    const uploadPlaylistIdParams = new URLSearchParams();
    uploadPlayListIds.forEach((id) => {
      uploadPlaylistIdParams.append('uploadPlayListIds', id);
    });

    const res = await fetch(
      basePath + '?' + uploadPlaylistIdParams.toString(),
    ).then((r) => r.json());
    return res;
  } catch (err) {
    console.log('Failed getting videos ' + err);
    return err;
  }
};

export default { getVideosForChannels };
