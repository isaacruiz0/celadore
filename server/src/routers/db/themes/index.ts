import express, { Request, Response } from "express";
import FeedThemesModel from "../../../models/FeedThemes";
const router = express.Router();

const basePath = "/db/themes";
router.post(basePath, async (req: Request, res: Response) => {
  // If parentFeedThemeId does not exist frontend should definitely send it with null
  const docData = req.body;
  try {
    const feedThemeDoc = new FeedThemesModel(docData);
    const dbFeedThemeDoc = await feedThemeDoc.save();
    return res.status(200).json(dbFeedThemeDoc);
  } catch (err) {
    console.log("Making error theme failed:", err);
    return res.status(400).end();
  }
});

router.get(basePath, async (req: Request, res: Response) => {
  try {
    const themes = await FeedThemesModel.find();
    return res.status(200).send(themes);
  } catch (err) {
    console.log("Error getting themes from db:", err);
    return res.status(400).end();
  }
});

export default router;
