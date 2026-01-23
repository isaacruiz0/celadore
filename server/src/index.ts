import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const clientDistPath = path.join(__dirname, "../dist");
app.use(express.static(clientDistPath));

// SPA fallback
app.all("/{*any}", (req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
