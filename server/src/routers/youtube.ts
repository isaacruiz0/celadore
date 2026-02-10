import express, { Request, Response } from "express";
import type { Channel } from "../../../shared/types/channel";
const router = express.Router();

router.get("/channels/:channelId", (req: Request, res: Response) => {
  console.log("RAN GET FOR YOUTUBE");
  const channel: Channel = {
    profilePictureURL: "/temp-spyridon.jpg",
    name: "Father Spyridon",
    id: 0,
    username: "FatherSpyridonROCOR",
  };
  res.status(200).send(channel);
});

export default router;
