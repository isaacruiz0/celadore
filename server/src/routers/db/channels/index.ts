import express, { Request, Response } from "express";
import { ObjectId } from "mongoose";
import ChannelModel from "../../../models/Channel";
const router = express.Router();

const basePath = "/db/channels";

router.get(basePath, async (req: Request, res: Response) => {
  const { parentFeedThemeId } = req.query;
  try {
    const channels = await ChannelModel.find({ parentFeedThemeId });
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
    await ChannelModel.insertMany(channels);
    return res.status(200).end();
  } catch (err) {
    console.log("adding channels to collection failed", err);
  }
  return res.status(400).end();
});

/**
 * @description removes channel from collection
 */
router.delete(basePath, async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await ChannelModel.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (err) {
    console.log(`err deleting object with id: ${id}`, err);
  }

  return res.status(400).end();
});

export default router;
