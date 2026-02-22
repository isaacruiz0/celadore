import mongoose from "mongoose";
import { Channel } from "../../../shared/types/Schemas";

const ChannelSchema = new mongoose.Schema<Channel>({
  id: String,
  profilePictureURL: String,
  youtubeChannelId: String,
  username: String,
  parentFeedThemeId: String,
});

ChannelSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // @ts-ignore;
    returnedObject.id = returnedObject._id.toString();
    // @ts-ignore;
    delete returnedObject._id;
    // @ts-ignore;
    delete returnedObject.__v;
  },
});
export default mongoose.model("Channel", ChannelSchema);
