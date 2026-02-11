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
    if (err instanceof Error) {
      console.log("Getting channel failed, error: " + err.message);
    }
    if (err instanceof z.ZodError) {
      console.log("Zod errors: " + err.issues);
    }

    res.status(400).end();
  }

  res.status(200).send(channel);
});

const temp = {
  kind: "youtube#channelListResponse",
  etag: "rzEmbLQYmgkkqOwFyPlwpRqEO6w",
  pageInfo: { totalResults: 1, resultsPerPage: 5 },
  items: [
    {
      kind: "youtube#channel",
      etag: "kPPwwU7t9HDzhCkwU7bBZMP7op8",
      id: "UCkpBmkoZ6yToHhB8uFDp46Q",
      snippet: {
        title: "Father Spyridon",
        description: "Orthodox priest serving in ROCOR.",
        customUrl: "@fatherspyridonrocor",
        publishedAt: "2009-08-11T12:06:43Z",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AIdro_noH6sTnufRoyGA79VTVtRJzkpcbHenPv49dI3biL4ZKiE=s88-c-k-c0x00ffffff-no-rj",
            width: 88,
            height: 88,
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AIdro_noH6sTnufRoyGA79VTVtRJzkpcbHenPv49dI3biL4ZKiE=s240-c-k-c0x00ffffff-no-rj",
            width: 240,
            height: 240,
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AIdro_noH6sTnufRoyGA79VTVtRJzkpcbHenPv49dI3biL4ZKiE=s800-c-k-c0x00ffffff-no-rj",
            width: 800,
            height: 800,
          },
        },
        localized: {
          title: "Father Spyridon",
          description: "Orthodox priest serving in ROCOR.",
        },
        country: "GB",
      },
    },
  ],
};

export default router;
