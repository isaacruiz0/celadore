import express, { Request, Response } from "express";
import ChannelModel from "../../../models/Channel";
const router = express.Router();

const basePath = "/db/channels";

router.get(basePath, async (req: Request, res: Response) => {
  try {
    const channels = await ChannelModel.find();
    return res.status(200).send(channels);
  } catch (err) {
    console.log("getting all channels from db failed");
    return res.status(400).end();
  }
});

export default router;
