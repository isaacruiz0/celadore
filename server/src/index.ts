import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import youtubeChannels from "./routers/youtube/channels/index";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const clientDistPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));
app.use("/api", youtubeChannels);

// SPA fallback
app.all("*", (req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
