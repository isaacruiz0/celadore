import mongoose from "mongoose";
import { FeedTheme } from "../../../shared/types/Schemas";

const FeedThemeSchema = new mongoose.Schema<FeedTheme>({
  id: String,
  name: String,
  parentFeedThemeId: { type: String, default: null },
});

FeedThemeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // @ts-ignore;
    returnedObject.id = returnedObject._id.toString();
    // @ts-ignore;
    delete returnedObject._id;
    // @ts-ignore;
    delete returnedObject.__v;
  },
});

export default mongoose.model("FeedThemes", FeedThemeSchema);
