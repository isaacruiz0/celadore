import express, { Request, Response } from "express";
import fs from "fs";
import { FeedContentType } from "../../../../../../shared/types/FeedConfigs";
import { VideoItem } from "../../../../";

const router = express.Router();

function filterDateRange(dateRange: Date) {
  //@ts-ignore
  ret = ret.reduce((acc, videoObj) => {
    //@ts-ignore
    videoObj.items = videoObj.items?.filter((item) => {
      return (
        new Date(item.contentDetails.videoPublishedAt).getTime() >
        dateRange.getTime()
      );
    });

    return acc.concat(videoObj.items);
  }, []);
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
  const dateRange: Date = new Date();
  const feedContentType: FeedContentType = FeedContentType.VIDEO;
  const userPreferences = { dateRange, feedContentType };

  if (!uploadPlayListIds?.length) {
    res.status(404).end();
  }
  try {
    const data = await Promise.all(
      uploadPlayListIds?.map(async (id) => {
        return await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=snippet%2CcontentDetails&playlistId=${id}&key=${process.env.YOUTUBE_API}`,
        ).then((r) => r.json());
      }),
    );
    fs.writeFile("json-data.json", JSON.stringify(data), () => {});
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    console.log("Failed getting videos" + err);

    res.status(404).end();
  }
});
export default router;
