import mongoose from "mongoose";
import { Channel } from "../../../shared/types/Schemas";

const ChannelSchema = new mongoose.Schema<Channel>({
  profilePictureURL: String,
  channelId: String,
  username: String,
  displayName: String,
});

ChannelSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    console.log("runnin schema transformation ");
    // @ts-ignore;
    returnedObject.id = returnedObject._id.toString();
    // @ts-ignore;
    delete returnedObject._id;
    // @ts-ignore;
    delete returnedObject.__v;
  },
});
export default mongoose.model("Channel", ChannelSchema);
