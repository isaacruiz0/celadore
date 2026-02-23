import express, { Request, Response } from "express";
import dotenv from "dotenv";
import type { Channel } from "../../../../../shared/types/Schemas";
import * as z from "zod";

const router = express.Router();
dotenv.config();

const youtubeChannelAPI = "https://youtube.googleapis.com/youtube/v3/channels";
const basePath = "/youtube/channels";

const ChannelSchema = z.object({
  profilePictureURL: z.coerce.string<string>(),
  name: z.coerce.string<string>(),
  username: z.coerce.string<string>(),
  youtubeChannelId: z.coerce.string<string>(),
  parentFeedThemeId: z.coerce.string<string>(),
});

router.get(basePath, async (req: Request, res: Response) => {
  const { handle, feedThemeId } = req.query;
  const youtubeAPIQuery = `?part=snippet&forHandle=${handle}&key=${process.env.YOUTUBE_API}`;
  const targetAPI = youtubeChannelAPI + youtubeAPIQuery;
  let channel: Channel | null = null;
  try {
    const data = await fetch(targetAPI).then((r) => r.json());
    const fetchedChannel = data.items[0];
    const channelProps = {
      name: fetchedChannel.snippet.title,
      profilePictureURL: fetchedChannel.snippet.thumbnails.default.url,
      username: handle,
      youtubeChannelId: fetchedChannel.id,
      parentFeedThemeId: feedThemeId,
    };
    channel = ChannelSchema.parse(channelProps);

    return res.status(200).send(channel);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("Zod errors: " + err.issues);
    }
    if (err instanceof Error) {
      console.log("Getting channel failed, error: " + err.message);
    }
    return res.status(400).end();
  }
});

export default router;
