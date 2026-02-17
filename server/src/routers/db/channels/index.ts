import express, { Request, Response } from "express";
import dotenv from "dotenv";
import type { Channel } from "../../../../../shared/types/channel";
import * as z from "zod";

const router = express.Router();
dotenv.config();

const basePath = "/db/channels";

router.get(basePath, async (req: Request, res: Response) => {
  try {
  } catch (err) {
    return res.status(400).end();
  }

  return res.status(200).send();
});

export default router;
