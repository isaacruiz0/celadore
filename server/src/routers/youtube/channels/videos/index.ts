import express, { Request, Response } from "express";

const router = express.Router();

const basePath = "/youtube/channels/videos";
router.get(basePath, async (req: Request, res: Response) => {
  let uploadPlayListIds = req.query?.uploadPlayListIds;
  if (!uploadPlayListIds) {
    return res.status(404).end();
  }
  if (!Array.isArray(uploadPlayListIds)) {
    // @ts-ignore
    uploadPlayListIds = [uploadPlayListIds];
  }
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 1);
  twoWeeksAgo.setHours(0, 0, 0, 0);
  const twoWeeksAgoDate = twoWeeksAgo.toISOString();
  if (!uploadPlayListIds?.length) {
    res.status(404).end();
  }
  try {
    for (let i = 0; i < uploadPlayListIds?.length; i++) {}
    const data = await Promise.all(
      uploadPlayListIds?.map((id  => {
        return await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&publishedAfter=${twoWeeksAgoDate}&playlistId=${id}&key=${process.env.YOUTUBE_API}`,
        ).then((r) => r.json());
      }),
    );
    console.log(data);
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    console.log("Failed getting videos" + err);

    res.status(404).end();
  }
});
export default router;
