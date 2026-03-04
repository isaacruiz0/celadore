import express, { Request, Response } from "express";
import fs from "fs";
import FeedContentType from "../../../../../../shared/types/FeedConfigs";
import { VideoItem } from "../../../../../../shared/types/API";

const router = express.Router();

/**
 *
 * @param ret an array of
 * @param dateRange
 * @returns
 */
function filterDateRange(data: Array<VideoItem>, dateRange: Date) {
  data = data.filter((videoItem) => {
    return new Date(videoItem.datePublished).getTime() > dateRange.getTime();
  });
  return data;
}
function filterContentType(
  data: Array<VideoItem>,
  feedContentType: FeedContentType,
) {
  if (feedContentType === FeedContentType.VIDEO) {
    // Ping youtube shorts header and only add if !200 that means it is not a short and is a video and should therefore be included and otherwise excluded
  }
  return data;
}

//@ts-ignore
function constructChannelVideoData(rawVideoData) {
  //@ts-ignore
  const parsedVideoData: Array<VideoItem> = rawVideoData.map((rawVideoItem) => {
    const videoItem: VideoItem = {
      title: rawVideoItem.snippet.title,
      channelName: rawVideoItem.snippet.channelTitle,
      description: rawVideoItem.snippet.description,
      thumbnailURL: rawVideoItem.snippet.thumbnails.high.url,
      id: rawVideoItem.contentDetails.videoId,
      datePublished: rawVideoItem.contentDetails.videoPublishedAt,
    };
    return videoItem;
  });
  return parsedVideoData;
}

const basePath = "/youtube/channels/videos";
router.get(basePath, async (req: Request, res: Response) => {
  let uploadPlayListIds = req.query?.uploadPlayListIds;
  if (!uploadPlayListIds) {
    return res.json({ status: 400, error: "No uploadPlayListIds sent" });
  }
  if (!Array.isArray(uploadPlayListIds)) {
    // In the case there is only one uploadlayListId, it will be parsed from the query as a string
    // @ts-ignore
    uploadPlayListIds = [uploadPlayListIds];
  }
  // TODO: Grab user preferences and use that for their configured video feed
  // TODO: Connect this with a user document
  let dateRange: Date = new Date();
  dateRange.setDate(dateRange.getDate() - 14);
  dateRange.setHours(0, 0, 0);
  const feedContentType: FeedContentType = FeedContentType.VIDEO;
  const userPreferences = { dateRange, feedContentType };

  if (!uploadPlayListIds?.length) {
    res.status(404).end();
  }

  try {
    const ret = await Promise.all(
      uploadPlayListIds?.map(async (id) => {
        return await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=snippet%2CcontentDetails&playlistId=${id}&key=${process.env.YOUTUBE_API}`,
        ).then((r) => r.json());
      }),
    );
    let videoData: Array<VideoItem> = [];

    for (let i = 0; i < ret.length; i++) {
      videoData = videoData.concat(constructChannelVideoData(ret[i].items));
    }
    videoData = filterDateRange(videoData, userPreferences.dateRange);
    videoData = filterContentType(videoData, userPreferences.feedContentType);

    fs.writeFile("json-data.json", JSON.stringify(videoData), () => {});

    res.status(200).send(JSON.stringify(videoData));
  } catch (err) {
    console.log("Failed getting videos" + err);

    res.status(404).end();
  }
});
export default router;
