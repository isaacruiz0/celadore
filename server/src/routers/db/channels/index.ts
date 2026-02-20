import express, { Request, Response } from "express";
import ChannelModel from "../../../models/Channel";
const router = express.Router();

const basePath = "/db/channels";

router.get(basePath, async (req: Request, res: Response) => {
  try {
    const channels = await ChannelModel.find();
    return res.status(200).send(channels);
  } catch (err) {
    console.log("getting all channels from db failed", err);
    return res.status(400).end();
  }
});

/**
 * @description adds an array of channels to collection
 */
router.post(basePath, async (req: Request, res: Response) => {
  try {
    const channels = req.body;
    const res1 = await ChannelModel.insertMany(channels);
    console.log(res1);
  } catch (err) {
    console.log("adding channels to collection failed", err);
  }
  return res.status(200).end();
});

export default router;
