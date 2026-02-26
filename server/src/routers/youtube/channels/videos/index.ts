import express, { Request, Response } from "express";
import fs from "fs";

const router = express.Router();

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
  // TODO: Connect this with user's date frequency selection
  const twoWeeksAgo = new Date();

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
