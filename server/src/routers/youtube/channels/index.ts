import express, { Request, Response } from "express";
import dotenv from "dotenv";
import type { Channel } from "../../../../../shared/types/channel";
import { v6 as uuidv6 } from "uuid";
import * as z from "zod";

const router = express.Router();
dotenv.config();

const youtubeChannelAPI = "https://youtube.googleapis.com/youtube/v3/channels";
const basePath = "/youtube/channels";

const ChannelSchema = z.object({
  name: z.string(),
  profilePictureURL: z.string(),
  id: z.uuid(),
  username: z.string(),
});

router.get(basePath, async (req: Request, res: Response) => {
  const { handle } = req.query;
  const youtubeAPIQuery = `?part=snippet&forHandle=${handle}&key=${process.env.YOUTUBE_API}`;
  const targetAPI = youtubeChannelAPI + youtubeAPIQuery;
  let channel: Channel | null = null;
  try {
    const data = await fetch(targetAPI).then((r) => r.json());
    const fetchedChannel = data.items[0];
    const name = fetchedChannel.snippet.title;
    const id = uuidv6();
    const profilePictureURL = fetchedChannel.snippet.thumbnails.default.url;
    const username = handle;

    channel = ChannelSchema.parse({ name, profilePictureURL, id, username });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("Zod errors: " + err.issues);
    }
    if (err instanceof Error) {
      console.log("Getting channel failed, error: " + err.message);
    }

    return res.status(400).end();
  }

  return res.status(200).send(channel);
});

export default router;
