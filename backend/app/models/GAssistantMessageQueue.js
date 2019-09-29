import mongoose from "mongoose";

const gassistantMessageQueueSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  messageQueue: {
    type: Array,
    required: true,
    unique: false
  }
});

export default mongoose.model("GAssistantMessageQueue", gassistantMessageQueueSchema);
